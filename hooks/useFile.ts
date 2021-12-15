import {ApiFileType} from '@/components/formComponents/File';
import {handler, useApi} from '@/providers/ApiProvider';
import {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';

function useFile(fileToUpload: File, name: string, index: number) {
    const api = useApi();
    const { formState: { isSubmitted }, setValue, getValues } = useFormContext();
    const [state, setState] = useState<{ file: null | File & Partial<ApiFileType>, url: string | null }>({
        file: null,
        url: null
    });

    const deleteFile = async () => {
        setValue(name, getValues(name).filter((item: ApiFileType) => item.id !== getValues(name)[index].id));
    };

    useEffect(() => {
        const formData = new FormData();
        formData.set('file', fileToUpload);
        const promise = (async () => {
            const { data, status } = await (handler(api.post('/files', formData)));
            console.log(data);
            // values combo of File and ApiFileType, starts as File, must merge with ApiFileType
            const initialFilesArr = getValues(name);
            const initialFileInstance = getValues(name)[index];

            const newFileKeys = Object.keys(data);
            for (const newFileKey of newFileKeys) {
                initialFileInstance[newFileKey] = data[newFileKey];
            }

            initialFilesArr[index] = initialFileInstance;
            setValue(name, initialFilesArr);
            setState({
                file: initialFileInstance,
                url: initialFileInstance?.relative_url ? `${process.env.NEXT_PUBLIC_API_URL}/${initialFileInstance.relative_url}` : `${process.env.NEXT_PUBLIC_API_URL}/files/${initialFileInstance.id}`
            });

            return initialFileInstance.id;
        })();

        return () => {
            promise.then(id => {
                if (!isSubmitted) api.delete(`/files/${id}`);
            });
        };
    }, []);

    return { ...state, deleteFile };
}


export default useFile;
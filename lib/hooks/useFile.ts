import {ApiFileType} from '@/components/formComponents/File';
import axios from '@/functions/shared/axios';
import {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';

function useFile(fileToUpload: File & ApiFileType, name: string, index: number) {
    const { formState: { isSubmitted }, setValue, getValues } = useFormContext();
    const [state, setState] = useState<{ file: null | File & ApiFileType }>({
        file: null
    });

    const deleteFile = async () => {
        setValue(name, getValues(name).filter((item: ApiFileType) => item.id !== getValues(name)[index].id));
    };

    useEffect(() => {
        const formData = new FormData();
        formData.set('file', fileToUpload);
        (async () => {
            const { data } = await axios.simplePost('/files', formData);

            // values combo of File and ApiFileType, starts as File, must merge with ApiFileType
            const initialFilesArr = getValues(name);
            const initialFileInstance = getValues(name)[index];

            const newFileKeys = Object.keys(data);
            for (const newFileKey of newFileKeys) {
                initialFileInstance[newFileKey] = data[newFileKey];
            }

            initialFileInstance.url = initialFileInstance?.relative_url ? `${process.env.NEXT_PUBLIC_API_URL}/${initialFileInstance.relative_url}` : `${process.env.NEXT_PUBLIC_API_URL}/files/${initialFileInstance.id}`;

            initialFilesArr[index] = initialFileInstance;
            setValue(name, initialFilesArr);
            setState({
                file: initialFileInstance
            });
        })();
    }, []);

    return { ...state, deleteFile };
}


export default useFile;
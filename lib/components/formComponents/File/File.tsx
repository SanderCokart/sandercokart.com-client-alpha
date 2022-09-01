import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import {InputHTMLAttributes} from 'react';
import {useFormContext} from 'react-hook-form';

import {Button} from '@/components/Button';
import FileCarousel from '@/components/formComponents/File/FileCarousel';
import FileDropbox from '@/components/formComponents/File/FileDropbox';

import {ApiDeleteFilesDestroyRoute} from '@/constants/api-routes';

import axios from '@/functions/shared/axios';
import getDifference from '@/functions/shared/getDifference';

import {FileModel} from '@/types/ModelTypes';

import styles from './File.module.scss';


interface FileProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const File = (props: FileProps) => {
    const { watch, setValue, reset, getValues, control: { _defaultValues } } = useFormContext();
    const files = watch(props.name);

    const handleReset = async () => {
        const nonDefaultFiles = getDifference<FileModel>(getValues(props.name), _defaultValues[props.name]);
        for (const file of nonDefaultFiles) {
            await axios.simpleDelete(ApiDeleteFilesDestroyRoute(file.id));
        }
        reset();
    };

    return (
        <div className={classnames([styles.root, props.className])}>
            <Button circle className={styles.reset} onClick={handleReset}>
                <FontAwesomeIcon icon="history"/>
            </Button>
            {files.length > 0 && <FileCarousel name={props.name}/>}
            {(props.multiple || files.length === 0) && <FileDropbox multiple={props.multiple} name={props.name}/>}
        </div>
    );
};

export default File;
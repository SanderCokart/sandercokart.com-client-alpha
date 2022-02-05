import Button from '@/components/Button';
import Input from '@/components/formComponents/Input';
import Radio from '@/components/formComponents/Radio';
import Select from '@/components/formComponents/Select';
import Textarea from '@/components/formComponents/Textarea';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import type {FC} from 'react';
import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

const Test: FC = () => {
    const testForm = useForm({
        defaultValues: {
            'select': '1'
        },
        resolver: yupResolver(Yup.object().shape({})),
        mode: 'all'
    });

    const { register, handleSubmit } = testForm;

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (values: any) => {
        console.log(values);
    };

    const options = [
        {
            label: 'Checkbox 1',
            value: 'checkbox1'
        },
        {
            label: 'Checkbox 2',
            value: 'checkbox2'
        }
    ];

    return (
        <FormProvider {...testForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input loading={isLoading}/>
                <Select registerFormHook={{...register('select')}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </Select>
                <Textarea label="label" loading={isLoading} placeholder="lorem ipsum"/>
                <Button type="submit">Submit</Button>
                <Button onClick={() => setIsLoading(prev => !prev)}>Load</Button>
            </form>
        </FormProvider>
    );
};


export default Test;
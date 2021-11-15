import Checkbox from '@/components/formComponents/Checkbox';
import CheckboxGroup from '@/components/formComponents/CheckboxGroup';
import Date from '@/components/formComponents/Date';
import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
import Radio from '@/components/formComponents/Radio';
import Select from '@/components/formComponents/Select';
import TextArea from '@/components/formComponents/TextArea';
import {yupResolver} from '@hookform/resolvers/yup';
import type {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';

const Test: FC = () => {
    const methods = useForm({
        resolver: yupResolver(Yup.object().shape({
            input: Yup.string().min(8).required()
        })),
        mode: 'all',
        defaultValues: {
            file: [],
            input: ''
        }
    });


    const onSubmit = (data: { name: string }) => {
        console.log(data);
    };

    const options = [{ label: 'label', value: 'value' }, { label: 'label2', value: 'value2' }, {
        label: 'label3',
        value: 'value3'
    }];

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Input label="name" name="input"/>
                <Checkbox label="checkbox" name="checkbox"/>
                <CheckboxGroup label="Pick something" name="checkbox_group" options={options}/>
                <Radio label="Pick something" name="radio" options={options}/>
                <Select label="Select Label" name="select" prependIcon={['fas', 'spinner']}>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </Select>
                <TextArea name="textarea"/>
                <Date name="date" prependIcon="spinner" type="date"/>
                <File multiple name="file"/>
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    )
        ;
};

export default Test;
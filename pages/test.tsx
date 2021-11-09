import Checkbox from '@/components/hookFormComponents/Checkbox';
import CheckboxGroup from '@/components/hookFormComponents/CheckboxGroup';
import Date from '@/components/hookFormComponents/Date';
import Input from '@/components/hookFormComponents/Input';
import Radio from '@/components/hookFormComponents/Radio';
import Select from '@/components/hookFormComponents/Select';
import TextArea from '@/components/hookFormComponents/TextArea';
import {yupResolver} from '@hookform/resolvers/yup';
import type {FC} from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

const Test: FC = () => {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        resolver: yupResolver(Yup.object().shape({})),
        mode: 'all'
    });


    const onSubmit = (data: { name: string }) => {
        console.log(data);
    };

    const options = [{ label: 'label', value: 'value' }, { label: 'label2', value: 'value2' }, {
        label: 'label3',
        value: 'value3'
    }];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('name')} error={errors['name']} label="name"/>
            <Checkbox error={errors['checkbox']} {...register('checkbox')} label="checkbox"/>
            <CheckboxGroup label="Pick something" {...register('checkboxGroup')} error={errors['checkboxGroup']}
                           options={options}/>
            <Radio label="Pick something" {...register('radio')} error={errors['radio']}
                   options={options}/>
            <Select {...register('select')} error={errors['select']} label="Select Label">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </Select>
            <TextArea {...register('textarea')} error={errors['textarea']}/>
            <Date {...register('date')} error={errors['date']}/>
            <button disabled={!isDirty || !isValid} type="submit">Submit</button>
        </form>
    )
        ;
};

export default Test;
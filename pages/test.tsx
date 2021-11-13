import File from '@/components/formComponents/File';
import Input from '@/components/formComponents/Input';
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
                {/*<Checkbox error={errors['checkbox']} {...register('checkbox')} label="checkbox"/>*/}
                {/*<CheckboxGroup label="Pick something" {...register('checkboxGroup')} error={errors['checkboxGroup']}*/}
                {/*               options={options}/>*/}
                {/*<Radio label="Pick something" {...register('radio')} error={errors['radio']}*/}
                {/*       options={options}/>*/}
                {/*<Select {...register('select')} error={errors['select']} label="Select Label">*/}
                {/*    <option value="option1">Option 1</option>*/}
                {/*    <option value="option2">Option 2</option>*/}
                {/*    <option value="option3">Option 3</option>*/}
                {/*</Select>*/}
                {/*<TextArea {...register('textarea')} error={errors['textarea']}/>*/}
                {/*<Date {...register('date')} error={errors['date']} type="time"/>*/}
                <File multiple name="file"/>
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    )
        ;
};

export default Test;
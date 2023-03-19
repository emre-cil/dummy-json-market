import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, selectAddressList } from '@/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import classes from './Address.module.scss';
import { useTranslation } from 'react-i18next';
import AddressCard from '@/components/Cards/AddressCard/AddressCard';
import { toast } from 'react-hot-toast';

export type AddressType = {
  id: number;
  name: string;
  surname: string;
  phone: string;
  address: string;
  town: string;
  city: string;
  doorNo?: string;
};

const Address = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addressList = useSelector(selectAddressList);

  const handleSubmit = (values: AddressType, { resetForm }: any) => {
    dispatch(
      addAddress({
        ...values,
        id: Math.floor(Math.random() * 100000),
      }),
    );
    resetForm();
    toast.success(t('address.added').toString());
  };
  const validationSchema = Yup.object({
    // name min 2
    name: Yup.string().min(2, t('address.nameMin').toString()).required(t('address.nameRequired').toString()),
    // surname min 2
    surname: Yup.string().min(2, t('address.surnameMin').toString()).required(t('address.surnameRequired').toString()),
    // phone format check can include + and 0
    phone: Yup.string()
      .matches(/^[+0-9]+$/, t('address.phoneFormat').toString())
      .required(t('address.phoneRequired').toString()),
    // address min 5
    address: Yup.string().min(5, t('address.addressMin').toString()).required(t('address.addressRequired').toString()),
    // town min 2
    town: Yup.string().min(2, t('address.townMin').toString()).required(t('address.townRequired').toString()),
    // city min 2
    city: Yup.string().min(2, t('address.cityMin').toString()).required(t('address.cityRequired').toString()),
    // doorNo min 1
    doorNo: Yup.string(),
  });
  const initialValues: AddressType = {
    id: 0,
    name: '',
    surname: '',
    phone: '',
    address: '',
    town: '',
    city: '',
    doorNo: '',
  };

  const inputList = [
    {
      id: 1,
      title: t('address.name'),
      name: 'name',
      type: 'text',
    },
    {
      id: 2,
      title: t('address.surname'),
      name: 'surname',
      type: 'text',
    },
    {
      id: 3,
      title: t('address.phone'),
      name: 'phone',
      type: 'text',
    },
    {
      id: 4,
      title: t('address.address'),
      name: 'address',
      type: 'text',
    },
    {
      id: 6,
      title: t('address.city'),
      name: 'city',
      type: 'text',
    },
    {
      id: 5,
      title: t('address.town'),
      name: 'town',
      type: 'text',
    },

    {
      id: 7,
      title: t('address.doorNo'),
      name: 'doorNo',
      type: 'text',
    },
  ];

  return (
    <div className="container-lg">
      <div className={classes.addressList}>
        {addressList.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>

      <div className={classes.form}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({ isSubmitting }) => (
            <Form>
              {inputList.map((input) => (
                <div key={input.id}>
                  <label htmlFor={input.name}>{input.title}</label>
                  <Field type={input.type} name={input.name} id={input.name} />
                  <ErrorMessage name={input.name} component="div" className={classes.error} />
                </div>
              ))}

              <button type="submit" disabled={isSubmitting}>
                {t('submit')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Address;

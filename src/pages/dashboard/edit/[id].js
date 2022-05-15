import FormProduct from '@components/FormProducts';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import useAlert from '@hooks/useAlert';

export default function Edit() {
  const { setAlert } = useAlert({});
  const router = useRouter();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const { id } = router.query;
    async function getProduct() {
      const response = await axios(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    getProduct();
  }, [router?.isReady]);
  return <FormProduct product={product} setAlert={setAlert} />;
}

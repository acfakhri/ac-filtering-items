import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Gallery from './Gallery';
import { Item } from './DataType';

const ImageData: React.FC = () => {
  const [data, setData] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.nekosapi.com/v3/images');
        setData(response.data.items);
        setLoading(false);
      } catch (error) {
        handleFetchError(error as AxiosError);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFetchError = (error: AxiosError) => {
    if (error.response) {
      setError(`Server responded with status code: ${error.response.status}`);
    } else if (error.request) {
      setError('No response received from server');
    } else {
      setError(error.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className='h-screen flex justify-center items-center'>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
<div className='w-full bg-blue-100'>
  <div className="container mx-auto px-4 py-8">
    <Gallery items={data} />
  </div>
</div>
  );
};

export default ImageData;

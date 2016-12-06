import { splashService } from 'services';

const fetchData = () => {
  return splashService.getResources()
          .then(res => res.data);
};

export default fetchData;


import { LoadingIcon } from './loading-icon';
import '../styles/loading.css';

export function Loading() {
  return (
    <div className='loading-container'>
      <LoadingIcon className='loading-icon' />
    </div>
  );
}

import { FC } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <ul>
        <li>
          <Link to='/products/37311'>Product 1</Link>
        </li>
        <li>
          <Link to='/products/37312'>Product 2</Link>
        </li>
        <li>
          <Link to='/products/37313'>Product 3</Link>
        </li>
      </ul>
    </div>
  );
};

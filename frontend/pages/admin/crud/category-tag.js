import Layout from '../../../components/Layout';
import Link from 'next/link';
import Admin from '../../../components/auth/Admin';

import Category from '../../../components/crud/Category';


const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className='row'>
        
          <div className='col-md-12 pt-5 pb-5'>
            <h2>Manage Category and tags</h2>
          </div>
          <div className='col-md-6'>
            <Category />
          </div>
          <div className='col-md-6'>
            <p> Tags </p>
          </div>
        </div>
      </Admin>
      
    </Layout>
  );
};

export default CategoryTag;
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';

import { createCategory, getCategories, removeCategory } from '../../actions/category';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  });
 
  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie('token');
  
  const loadCategories = () => {
    getCategories().then(({data}) => {
      setValues({ ...values, categories: data });
      console.log({data})
  }).catch(err => {
    console.log(err.message)
  })
};

    useEffect(() => {
      loadCategories();
    }, [reload]);

    
    const showCategories = () => {
        return categories.map((category, i) => {
            return (
              <button
                onDoubleClick={() => deleteConfirm(category.slug)}
                title="Double click to delete"
                key={i}
                className="btn btn-outline-primary mr-1 ml-1 mt-3"
              >
                {category.name}
              </button>
            );
        });
    };
 
    const deleteConfirm = slug => {
        let yes = window.confirm('Are you sure you want to delete this category?');
        if (yes) {
            deleteCategory(slug);
        }
    };
 
    const deleteCategory = async (slug) => {
        console.log('delete', slug);
        try {
          const  data = await removeCategory(slug, token)
          setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
          
        } catch (error) {
          console.log(error.message)
        }
    };
 
    const submitHandler = e => {
      e.preventDefault();
      // console.log('createCategory category', name);
      createCategory({ name }, token).then(data => {
        // setValues({ ...values, error: false, success: true, name: '', removed: !removed, reload: !reload });
        setValues({ ...values, error: false, success: true, name: '', reload: !reload });

        console.log(data)
      }).catch(err => {
        console.log(err.message)
        setValues({ ...values, error: err.message, success: false });
      })
    };
 
    const handleChange = e => {
      setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    };
 
    const showSuccess = () => {
        if (success) {
            return <p className="text-success">Category is created</p>;
        }
    };
 
    const showError = () => {
        if (error) {
            return <p className="text-danger">Category already exist</p>;
        }
    };
 
    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Category is removed</p>;
        }
    };
 
    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };
 
    const newCategoryForm = () => (
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input type="text" className="form-control" onChange={handleChange} value={name} required />
            <label className="text-muted">Name</label>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
                Create
            </button>
          </div>
        </form>
    );
 
    return (
      <React.Fragment>
        {showSuccess()}
        {showError()}
        {showRemoved()}
        <div onMouseMove={mouseMoveHandler}>
          {newCategoryForm()}
          {showCategories()}
        </div>
      </React.Fragment>
  );
};
 
export default Category;
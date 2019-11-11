import React, {useState, useEffect} from 'react';
import {getCookie} from '../../actions/auth';
import Link from 'next/link';
import Router from 'next/router';
import { getTags, removeTag, createTag } from '../../actions/tag';

const Tag = () => {

  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false
  })

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie('token');

  const loadTags = async () => {
    try {
      const {data} = await getTags();
      console.log(data)
      setValues({...values, tags: data});
    } catch (error) {
      console.log(error.message)
    }

  }

  useEffect(() => {
    loadTags();
  }, [reload])

  const showTags = () => {
    return tags.map((tag, i) => {
        return (
          <button
            onDoubleClick={() => deleteConfirm(tag.slug)}
            title="Double click to delete"
            key={i}
            className="btn btn-outline-primary mr-1 ml-1 mt-3"
          >
            {tag.name}
          </button>
        );
    });
};

  const deleteTag = async (slug) => {
    console.log('delete', slug);
    try {
      const  data = await removeTag(slug, token)
      setValues({...values, error: false, success: false, name: '', removed: !removed, reload: !reload});
      
    } catch (error) {
      console.log(error.message)
    }
};

  const deleteConfirm = (slug) => {
    let yes = window.confirm('are you sure to delete?');
    if(yes) {
      deleteTag(slug)
    }
  }

  const handleChange = e => {
    setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await createTag({name}, token)
      console.log(data);
      setValues({ ...values, error: false, success: true, name: '', reload: !reload });

    } catch (error) {
      setValues({ ...values, error: error.message, success: false, name: '', reload: !reload });
    }
  }

  const showSuccess = () => {
    if (success) {
        return <p className="text-success">Tag is created</p>;
    }
};

const showError = () => {
    if (error) {
        return <p className="text-danger">Tag already exist</p>;
    }
};

const showRemoved = () => {
    if (removed) {
        return <p className="text-danger">Tag is removed</p>;
    }
};

const mouseMoveHandler = e => {
  setValues({ ...values, error: false, success: false, removed: '' });
};

  const newTagForm = () => (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input type="text" className="form-control" onChange={handleChange} value={name} required />
        <label className="text-muted">Name</label>
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
            Create Tag
        </button>
      </div>
    </form>
  )

  return (
    <>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </>
  );
}

export default Tag;

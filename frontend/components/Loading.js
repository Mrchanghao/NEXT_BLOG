

export const ShowLoading = ({loading}) => {
  return(
    
    loading ? <div className='alert alert-info'>Loading...</div> : null
  )
};

export const ShowError = ({error}) => {
  return (
    error ? <div className='alert alert-danger'>{error}</div> : null
  )
};

export const ShowMessage = ({message}) => {
  return (
    message ? <div className='alert alert-info'>{message}</div> : null
  )
};

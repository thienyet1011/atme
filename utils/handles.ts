export const handleError = (err, dispatch, logoutUser, type) => {
  if (err.response) {
    if (err.response.status !== 401) {
      dispatch({
        type: type,
        payload: err.response.data,
      });
    } else {
      dispatch(logoutUser());
    }
  } else {
    dispatch({
      type: type,
      payload: { message: err.message },
    });
  }
};

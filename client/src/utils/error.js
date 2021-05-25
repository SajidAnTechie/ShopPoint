/**
 *
 * @param {Object} err
 * @returns {String}
 */
export const handleError = (err) => {
  if (err.response) {
    if (err.response.data.error) {
      return err.response.data.error;
    } else {
      return 'Somethind went wrong!';
    }
  } else {
    return err.message;
  }
};

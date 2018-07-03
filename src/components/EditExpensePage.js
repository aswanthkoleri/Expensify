import React from 'react';

const EditExpensePage = (props) => {
  console.log(props);
  return (
  <div>
    This is from my edit expense component with id : {props.match.params.id}
  </div>
);
}

export default EditExpensePage;

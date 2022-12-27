import RequestFoods from "./RequestFoods";

import VolHome from '../MUI/VolHome';

const RequestFood = ({user}) => {
    return (
      <VolHome user={user} children={<RequestFoods user={user} />} />
    )
  }

  export default RequestFood;
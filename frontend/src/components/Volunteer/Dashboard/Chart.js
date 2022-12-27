import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { useSelector, useDispatch } from "react-redux";
import {
 totalAcceptOfVol
} from "../../../actions/foodAction.js";




// Generate Sales Data
function createData(date, day) {
  return { date, day };
}



export default function Chart({user}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const [food ,setFood] = useState([{date : "" , foodName : ""}])
  // const { isAuthenticated, user } = useSelector((state) => state.user);

  const {
    acceptedFoods,
    loading,
    error,

  } = useSelector((state) => state.acceptedFoods);
  // const { acceptedFoodDetails }=acceptedFoods;

React.useEffect(() => {
  // store.dispatch(loadUser())
user && dispatch(totalAcceptOfVol(user._id))
   console.log(acceptedFoods )

  }, [dispatch]);


  const data = [
   
   
    // createData('03:00', 300),
    // createData('06:00', 600),
    // createData('09:00', 800),
    // createData('12:00', 1500),
    // createData('15:00', 2000),
    // createData('18:00', 2400),
    // createData('21:00', 2400),
    // createData('24:00', undefined)
  ]; 
  // 
  //  fooetails && acceptedFoods .forEach((food)=>{ data.push(createData(`${food.foodCreatedDate}`, food.day))})

  acceptedFoods && acceptedFoods.acceptedFoodDetails && acceptedFoods.acceptedFoodDetails.forEach((food)=>{ data.push(createData(`${food.month}/${food.year}`, food.day))})



  return (
    <React.Fragment>
      <Title>This Year </Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
             Days of Acceptance
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="day"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
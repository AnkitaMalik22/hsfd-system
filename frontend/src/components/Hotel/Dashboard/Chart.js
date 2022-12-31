import React, { useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title.js';
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store.js";
import { loadUser,clearErrors } from "../../../actions/userActions";
import {
  
  foodsOfThisMonth,
} from "../../../actions/foodAction.js";
import { useSnackbar } from 'notistack';



// Generate Sales Data
function createData(date, day) {
  return { date, day };
}



export default function Chart() {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const [food ,setFood] = useState([{date : "" , foodName : ""}])
  const {isAuthenticated, user} = useSelector((state) => state.user);
  const {
    foodDetails,
        loading,
        error,
    
      } = useSelector((state) => state.foodsPerMonth);

      const { enqueueSnackbar } = useSnackbar();

      const showSnackbar = (error) => {
        enqueueSnackbar(error, {
          variant:'error',
        });
      }

      useEffect(() => {
        store.dispatch(loadUser())
       
      }, []);
    
  
  useEffect(() => {
    if (error) {
      showSnackbar("error",error)
      dispatch(clearErrors());
    }
   
  }, [error]);


 

React.useEffect(() => {
  // store.dispatch(loadUser())
user && dispatch(foodsOfThisMonth(user._id))
  //  console.log(foodDetails)

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
  //  fooetails && foodDetails.forEach((food)=>{ data.push(createData(`${food.foodCreatedDate}`, food.day))})

  foodDetails && foodDetails.forEach((food)=>{ data.push(createData(`${food.month}/${food.year}`, food.day))})

  console.log(data);

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
             Days of Donation
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
import React from 'react'
import { AreaChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text, Path } from 'react-native-svg'
import { StyleSheet, View, AppRegistry, TouchableOpacity, Image } from 'react-native';
import * as scale from 'd3-scale'
import dateFns from 'date-fns'

const Dimensions = require('Dimensions');

class LineChartComp extends React.PureComponent {

    render() {        
        const data = [
            {
                value: 100,
                date: dateFns.setHours(new Date(2018, 1, 2), 0),
            },
            {
                value: 20,
                date: dateFns.setHours(new Date(2018, 1, 3), 0),
            },
            {
                value: 100,
                date: dateFns.setHours(new Date(2018, 1, 4), 0),
            },
            {
                value: 10,
                date: dateFns.setHours(new Date(2018, 1, 5), 0),
            },
            {
                value: 40,
                date: dateFns.setHours(new Date(2018, 1, 6), 0),
            },
            {
                value: 110,
                date: dateFns.setHours(new Date(2018, 1, 7), 0),
            },
        ]

        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'#e9bfff'}
                fill={'none'}
            />
        )

        // console.log(data)
        return (
            <View style={{ height: 150, width: Dimensions.get('window').width, paddingHorizontal: 20, paddingBottom: 5, flex:1}}>                
                <AreaChart
                    style={{ flex: 1 }}
                    data={ data }
                    yAccessor={ ({ item }) => item.value }
                    xAccessor={ ({ item }) => item.date }
                    xScale={ scale.scaleTime }
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ fill: '#f9edff' }}
                    // curve={ shape.curveNatural }
                >  
                   <Line/>                   
                </AreaChart>
                <XAxis
                    data={ data }
                    svg={{
                        fill: 'black',
                        fontSize: 10,
                        rotation: 10,
                        originY: 30,
                        y: 5,
                    }}
                    xAccessor={ ({ item }) => item.date}
                    scale={ scale.scaleTime }
                    numberOfTicks={ 7 }
                    style={{ marginHorizontal: -15, height: 20 }}
                    contentInset={{ left: 10, right: 25 }}
                    formatLabel={ (value) => dateFns.format(value, 'MMMD')  }                        
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  graphTitle:{
    // textAlign: 'left',
    color:'black',
    fontFamily: 'Century Gothic',
    fontSize: 10,
    padding: 5,
  }
})

export default LineChartComp
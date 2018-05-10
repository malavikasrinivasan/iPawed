import React from 'react'
import { AreaChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text, Path } from 'react-native-svg'
import { StyleSheet, View, AppRegistry, TouchableOpacity, Image } from 'react-native';
import * as scale from 'd3-scale'
import dateFns from 'date-fns'

const Dimensions = require('Dimensions');

class LineChartComp extends React.PureComponent {

    constructor(props) {
        super(props);
        // this.state = {
        //     data = this.props.data
        // }
    }

    render() {        
        // console.log(this.props.data)
        if (!this.props.data){
            return(false);
        }
        const data = this.props.data
        const colorLine = this.props.colorLine
        const colorFill = this.props.colorFill

        if (data.length < 2){
            return(
                <View style={{ height: 150, width: Dimensions.get('window').width, paddingHorizontal: 20, paddingBottom: 5, flex:1}}> 
                    <Text style = {styles.graphTitle}> Waiting for Behavioral Data </Text>
                </View>
            )
        }

        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={colorLine}
                fill={'none'}
            />
        )

        return (
            <View style={{ height: 150, width: Dimensions.get('window').width, paddingHorizontal: 20, paddingBottom: 5, flex:1}}>                
                <AreaChart
                    style={{ flex: 1 }}
                    data={ data }
                    yAccessor={ ({ item }) => item.value }
                    xAccessor={ ({ item }) => item.date }
                    xScale={ scale.scaleTime }
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ fill: colorFill }}
                >  
                   <Line/>                   
                </AreaChart>
                <XAxis
                    data={ data }
                    svg={{
                        fill: 'black',
                        fontSize: 10,
                        rotation: 0,
                        originY: 30,
                        y: 5,
                    }}
                    xAccessor={ ({ item }) => item.date}
                    scale={ scale.scaleTime }
                    numberOfTicks={ 5 }
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
    color:'black',
    fontFamily: 'Century Gothic',
    fontSize: 10,
    padding: 5,
  }
})

export default LineChartComp
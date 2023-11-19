import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const Button = ({children,style,mode}) => {
    // console.log(children);
  return (
    <View style={style}>
      <Pressable style={({pressed})=> pressed && styles.pressed}>
        <View style={[styles.button , mode === 'flat' && styles.flat]}>
            <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        backgroundColor:GlobalStyles.colors.primary500,
        borderRadius:4,
        padding:8
    },
    buttonText:{
        color:'white',
        textAlign:'center',
    },
    flat:{
        backgroundColor:'trasparent'
    },
    flatText:{
        color:GlobalStyles.colors.primary100
    },
    pressed:{
        opacity:0.75,
        backgroundColor:GlobalStyles.colors.primary100,
        borderRadius:4
    }
})
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'

import styles from './popularjobs.style'
import { useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../../constants'


import PopularJobCard from '../../common/cards/popular/PopularJobCard'

import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {

  const router =  useRouter()

  const { data, isLoading, error} = useFetch(
    'search', {
     query: 'React developer',
     num_pages: 1
    }
  )

  const [selectedJob, setSelectedJob] = useState()

  const handleCardPress = (item) => {
    router.push(`job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
  }

  // console.log(data)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Popular jobs
        </Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>
            Show all
          </Text>
        </TouchableOpacity>
      </View>
      
      <View>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={COLORS.primary}/>
        ) : error ? (
            <Text>
              Something Went Wrong
            </Text>
        ): (
        <FlatList 
          data={data}
          renderItem={({item }) => (
            <PopularJobCard 
              item={item}
            />
          )}
          keyExtractor={item => item.job_id}
          contentContainerStyle={{columnGap: SIZES.medium}}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        )}
      </View>
    </View>
  )
}

export default Popularjobs
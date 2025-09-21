'use client';
import { useParams } from 'next/navigation';
import React from 'react';
//@TODO this page in in progress
// user details page containing all information of a user
const UserDetails = () => {
  //get user if from params
  const userId = useParams()?.id;
  return <div>UserDetails Component {userId}</div>;
};

export default UserDetails;

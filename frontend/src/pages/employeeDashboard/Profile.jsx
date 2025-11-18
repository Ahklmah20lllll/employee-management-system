import React from "react";
import { useParams } from "react-router-dom";
import View from "../../components/employee/View";

const Profile = () => {
  const { id } = useParams();
  return <View id={id} />;
};

export default Profile;

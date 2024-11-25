import React, { useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";

export default function Alert(props) {
  
  // Trigger a toast whenever `props.alert` changes
  useEffect(() => {
    if (props.alert) {
      toast[props.alert.type](props.alert.msg); // Dynamically trigger toast based on alert type
    }
  }, [props.alert]);

  return (
    <div className="container">
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

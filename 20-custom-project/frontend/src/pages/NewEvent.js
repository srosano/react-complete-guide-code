import { Link, useNavigation, json,redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

function NewEventPage() {

  return (
    <EventForm method="POST"/>
  )
}

export default NewEventPage;

export async function action({request,params}){
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  }

  const response = fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData),
  });


  if(response.status === 422){
    return response;
  }


  if(!response.ok){
    console.log("RESPONSE STATUS", response.status);
    throw json({message: "Could not create new event."}, {status: 500})
  }
  return redirect("/events")
}
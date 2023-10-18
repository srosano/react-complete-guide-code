import EventForm from "../components/EventForm";
import { useLoaderData, useRouteLoaderData} from "react-router-dom";

function EditEventPage() {
  const data = useRouteLoaderData("event-detail");
  const event = data.event;

  return (
    <EventForm event={event} method="PATCH"/>
  )
}

export default EditEventPage;

import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     title: "1 test st, 12345 city",
//     address: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     title: "2 test st, 12345 city",
//     address: "This is a Second meetup",
//   },
//   {
//     id: "m3",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     title: "3 test st, 12345 city",
//     address: "This is a third meetup",
//   },
// ];

function HomePage(props) {
  // const [loadedMeetups,setLoadedMeetups] = useState([]);

  // useEffect(()=>{
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // },[]);

  return (
    <Fragment>
      <Head><title>The title</title>
      <meta name="description" content="Browse a huge list of highactive react meetups"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// Runs on the server after deployment
// not during the build process
// getServerSideProps only runs on server-side and never runs on the browser
// request this page directly, getServerSideProps runs at request time,
// and this page will be pre-rendered with the returned props

// page on client-side page transitions through next/link or next/router,
// Next.js sends an API request to the server, which runs getServerSideProps

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // execute any code the normally run on the server (server-side code)
  // for example connect securely to database, access a file system here
  // executed only during the build process
  // Not on the client side, never executed on the client side
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.9nson7c.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // always need to return an object
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

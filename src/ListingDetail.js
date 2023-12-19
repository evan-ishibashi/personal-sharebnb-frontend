import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ShareBnbApi from "./api";




function ListingDetail() {

  const [currListing, setCurrListing] = useState(null);
  const { id } = useParams();

  useEffect(() => {
      /** API call to get company by handle */
      async function populateListing() {
          const listing = await ShareBnbApi.getListing(id);
          setCurrListing(listing);
      }

      populateListing();
  }, []);




  if (!currListing) return <h1>LOADING...</h1>;

  return (
      <div className="ListingDetail">
          <h2>{currListing.name}</h2><br />
          <p>{currListing.details}</p><br />
          <p>{currListing.price}</p>
      </div>

  );
}

export default ListingDetail;
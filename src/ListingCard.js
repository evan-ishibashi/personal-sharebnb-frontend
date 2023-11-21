import { Link } from "react-router-dom";
import './ListingCard.css';

/** Shows Listing Info.
 *
 * Props
 * - listing: { name, photos, price, details, id }
 *
 * App -> ListingsList -> ListingCard
 *
 * TODO: Add button to book, probably pass functionality down from parent
 */
function ListingCard({ listing }) {
  const { name, photos, price, details, id, host } = listing;
  return (
    <div className="ListingCard card w-75 mb-4 mt-4 mx-auto">
      <Link className="Listing card text-decoration-none" to={`/listings/${id}`}>
        <h3 className="card-body">{name}</h3>
        <small>{details}</small><br />
        <small>${price}</small>
        {photos && <img src={photos[0]?.url} width={150} className="img-thumbnail"></img>}
      </Link>
    </div>
  );
}

export default ListingCard;
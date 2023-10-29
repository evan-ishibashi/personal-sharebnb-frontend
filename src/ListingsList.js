import { useState, useEffect } from 'react';
import ShareBnbApi from './api';
import SearchForm from './SearchForm';
import ListingCard from './ListingCard';
/** ListingsList: displays property listings
 *
 * State:
 * - listings like [{listing},...]
 *
 * RoutesList -> ListingsList -> ListingCard
 */
function ListingsList() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function fetchListingsWhenMounted() {
    async function fetchListings() {
      setIsLoading(true);
      setListings(await ShareBnbApi.getListings(searchTerm));
      setIsLoading(false);
    }
    fetchListings();
  }, [searchTerm]);

  /** updating searchTerm state */
  function updateSearch(newSearchTerm) {
    setSearchTerm(newSearchTerm);
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className='ListingsList'>
      <SearchForm updateSearch={updateSearch} />
      {listings.length === 0 &&
        <h5 className="mt-4">Sorry, no listings were found!</h5>}

      {listings.map(listing => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );

}

export default ListingsList;
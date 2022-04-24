import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, /// Tells apollo we take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      /// read number of item from cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count ?? 0;
      const page = skip / first + 1;
      const totalPage = Math.ceil(count / first);

      /// First, ask read function about the item
      const items = existing.slice(skip, skip + first).filter((item) => !!item);
      // If
      // there are items
      // AND there arent enuf to satisfy how many requested
      // AND on the last page
      // THEN just send it
      if (items.length && items.length !== first && page === totalPage)
        return items;

      if (items.length !== first) {
        // we dont have any item, back to nw
        return false;
      }
      /// If there's any just returned it from cache
      if (items.length) {
        console.log(
          `XX There are: ${items.length} in the cache! Send to Apollo`
        );
        return items;
      }
      /// fallback to nw
      return false;

      /// We can either:
      /// 1. return items that exists on cache
      /// 2. return false cause it's empty and do network request
    },
    merge(existing, incoming, { args }) {
      const { skip } = args;

      /// apollo client back from the client with our product
      console.log(`XX Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(`XX Merged: ${merged}`);
      /// return merged and run the read again
      return merged;
    },
  };
}

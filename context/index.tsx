import React, { ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import { CategoryModel } from "../model/Category";
import { getCategoriesFn } from "../queries-fn/category.fn";

export type AppContextType = {
  categories: CategoryModel[];
  route: string;
};

export const AppContext = React.createContext<AppContextType>(
  {} as AppContextType
);

export function AppProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [route, setRoute] = useState<string>("/");

  const { pathname } = useRouter();

  useEffect(() => {
    getCategoriesFn()
      .then((payload) => {
          const { categories } = payload;
          setCategories(categories);
      })
      .catch((err) => console.log("Error: ", err.message));
  }, []);

  useEffect(() => {
    setRoute(pathname);
  }, [pathname])

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const defaultValue = useMemo(
    () => ({
      categories,
      route
    }),
    [categories, route]
  );

  return (
    <AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

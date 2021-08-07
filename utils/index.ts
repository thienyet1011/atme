import { NextRouter } from "next/router";
import { QueryClient } from "react-query";

export function getAsString(value: string|string[]): string {
    if(Array.isArray(value)) {
        return value[0];
    }

    return value;
}

export function getValueAsNumber(value: string | string[]) {
    const str = getAsString(value);
    const number = parseInt(str);

    return isNaN(number) ? null : number;
}

export function getValueAsString(value: string | string[]) {
    const str = getAsString(value);
    return !str || str.toLowerCase() === 'all' ? null : str;
}

export async function onCompleted(data: any, err: any, 
  router: NextRouter, queryClient: QueryClient) {
    if (err) {
      const {status, payload} = JSON.parse(err.message);
    //   showError(payload);
  
      if (status === 401) {
        await queryClient.cancelMutations();
        await queryClient.cancelQueries();
        router.replace({
            pathname: '/admin/login',
            query: {from: router.pathname},
        }, undefined, {shallow: true});
      }
    }
  
    return data;
};

export function isActive(pathname: string, current_pathname: string) {
  if (pathname !== "/") {
    const active = current_pathname.includes(pathname);
    return active;
  }
  else return current_pathname === pathname;
}
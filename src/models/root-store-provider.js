import localforage from 'localforage';
import { applyPatch, applySnapshot, onSnapshot } from "mobx-state-tree";
import React, { createContext, useContext, useState, useRef } from 'react';
import useAsyncEffect from 'use-async-effect';
import { RootStore } from './root-store'

// const RootStoreContext = (createContext < RootStoreModel) | (null > null);
const RootStoreContext = createContext(null);

export const RootStoreProvider = ({ children }) => {
    const [loaded, setLoaded] = useState(false);
    const store = useRef();
    

    useAsyncEffect(async (isMounted) => {
        store.current = RootStore.create({ user: {} });

        const data = await localforage.getItem('rootStore');
        if (data) {
            try {
                console.log('Hydrating Store from Storage');
                applySnapshot(store.current, data);
                console.log('Successfully hydrated store from storage');
            } catch (error) {
                console.log('Failed to hydrate store. Throwing away data from stogare.');
                await localforage.removeItem('rootStore');
            }
        }

        // const saveSnapshot = debounce((snapshot) => {
        //   console.log("Saving Snapshot to Storage");
        //   localforage.setItem("rootStore", snapshot);
        // }, 1500);
        const saveSnapshot = (snapshot) => {
            //console.log("Saving Snapshot to Storage");
            localforage.setItem("rootStore", snapshot);
        };

        onSnapshot(store.current, (snapshot) => {
            console.log('New Snapshot Available');
            saveSnapshot(snapshot);
        });

        // const { default: makeInspectable } = await import("mobx-devtools-mst");
        // makeInspectable(store.current);

      
        if (isMounted()) {
            setLoaded(true);
        }
    }, []);

    if (!loaded || !store.current) {
        return null;
      }
    
      return <RootStoreContext.Provider value={store.current}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = () => {
    const store = useContext(RootStoreContext);
    if (!store) {
        throw new Error("useRootStore must be used within a RootStoreProvider.");
    }
    return store;
};

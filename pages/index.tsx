import React from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import Navbar from "@src/components/Navbar";
import RouteMap from "../src/pages/RouteMap";
import AboutUs from '../src/pages/AboutUs';
import { PagesProvider } from "@src/services/PagesContext";
import { MapDetailsProvider } from "@src/services/MapDetailsContext";

const Map = dynamic(() => import("../src/pages/Map"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>RekSTI Bus Monitoring</title>
        <meta name="description" content="RekSTI Bus Monitoring" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PagesProvider>
          <MapDetailsProvider>
            <div className="relative">
              <div>
                <>
                  <div>
                    <Navbar />
                  </div>
                  <Map />
                  <RouteMap />
                  <AboutUs />
                </>
              </div>
            </div>
          </MapDetailsProvider>
        </PagesProvider>
      </main>
    </>
  );
}

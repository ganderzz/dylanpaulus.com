import React from "react";
import { Layout } from "../../components/layout";
import { SEO } from "../../components/seo";
import { SubHeading } from "../../components/subheading";

const data = {
  desk: {
    items: [
      {
        name: "Desk",
        description:
          "Big and heavy. Found an old door: sanded it, stained, and varnished. Added two 2x4 saw horses as legs.",
      },
      {
        url: "https://www.keychron.com/products/keychron-k5-ultra-slim-wireless-mechanical-keyboard",
        name: "Keychron K5 SE Ultra-Slim Wireless Mechanical Keyboard",
        description: "Low Profile Gateron Mechanical / Red",
      },
      {
        url: "https://amzn.to/3SrkXn3",
        name: "Logitech MX Master 2S Wireless Mouse",
      },
    ],
  },
  computer: {
    description:
      "Built a PC primarily for gaming in 2017. Generally I use a Macbook Pro for development, but with a dead screen I've switched back to WSL/Windows 10.",
    items: [
      {
        url: "https://amzn.to/3vNkim5",
        name: "BenQ BL2711U 27-Inch IPS 4K Monitor",
        description: "This is an older monitor, but my favorite compared to the PD2700U below.",
      },
      {
        url: "https://amzn.to/3zFYXME",
        name: "BenQ PD2700U 27 inch 4K Monitor",
      },
      {
        url: "https://amzn.to/3vK7eOv",
        name: "Corsair Vengeance LPX 16GB RAM",
      },
      {
        url: "https://amzn.to/3vLgce5",
        name: "500GB WD Blue Solid State Drive",
      },
      {
        url: "https://amzn.to/3P4NJH8",
        name: "Corsair RM850x Power Supply",
      },
      {
        url: "https://amzn.to/3A3FUgy",
        name: "Corsair Hydro H100i Liquid Cooler",
      },
      {
        url: "https://amzn.to/3oZUOOD",
        name: "MSI Pro Series Intel Z270 Motherboard",
      },
      {
        url: "https://amzn.to/3JIcbNy",
        name: "NZXT S340 Elite ATX Tower",
      },
      {
        url: "https://amzn.to/3JAwyfj",
        name: "Asus GeForce GTX 1080 GPU",
      },
      {
        url: "https://amzn.to/3vIWU9u",
        name: "Intel Core i7-7700k",
      },
    ],
  },
  audio: {
    items: [
      {
        url: "https://amzn.to/3w9FT8H",
        name: "Edifier R1280T Powered Bookshelf Speakers",
      },
      {
        url: "https://amzn.to/3P0yTBz",
        name: "Motu M4 audio interface",
      },
      {
        url: "https://amzn.to/3Q94guT",
        name: "Neewer Microphone Arm Stand",
      },
      {
        url: "https://amzn.to/3vHB06k",
        name: "Shure SM57",
        description: "Not ideal, but an ok backup after my condenser mic died 😁",
      },
    ],
  },
};

const ItemList = ({ items }: { items: { name: string; url: string; description?: string }[] }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          {item.url ? (
            <a target="_blank" href={item.url}>
              {item.name}
            </a>
          ) : (
            item.name
          )}
          {item.description && <p style={{ paddingLeft: "1.5rem", margin: 0 }}>{item.description}</p>}
        </li>
      ))}
    </ul>
  );
};

export default function Uses() {
  return (
    <Layout>
      <section
        id="main-content"
        tabIndex={-1}
        className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto mt-8"
      >
        <h2>What I use</h2>
        <p>This is all the stuff I use to code and produce content.</p>

        {Object.keys(data).map((key) => (
          <div>
            <SubHeading>{key}</SubHeading>
            {data[key].description && <p>{data[key].description}</p>}
            <ItemList items={data[key].items} />
          </div>
        ))}
      </section>
    </Layout>
  );
}

export function Head() {
  return (
    <SEO
      title="Uses"
      keywords={[`software`, `code`, `programming`, `blog`, `portfolio`, `react`, `typescript`, `javascript`]}
    />
  );
}

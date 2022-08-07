import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { SubHeading } from "../../components/subheading";

export default function Uses() {
  return (
    <Layout>
      <SEO
        title="Uses"
        keywords={[`software`, `code`, `programming`, `blog`, `portfolio`, `react`, `typescript`, `javascript`]}
      />
      <section
        id="main-content"
        tabIndex={-1}
        className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto mt-8"
      >
        <h2>What I use</h2>

        <SubHeading>Computer</SubHeading>
        <ul>
          <li>
            <a href="https://amzn.to/3vNkim5">BenQ BL2711U 27-Inch IPS 4K Monitor</a>
          </li>
          <li>
            <a href="https://amzn.to/3vK7eOv">Corsair Vengeance LPX 16GB RAM</a>
          </li>
          <li>
            <a href="https://amzn.to/3vLgce5">500GB WD Blue Solid State Drive</a>
          </li>
          <li>
            <a href="https://amzn.to/3P4NJH8">Corsair RM850x Power Supply</a>
          </li>
          <li>
            <a href="https://amzn.to/3A3FUgy">Corsair Hydro H100i Liquid Cooler</a>
          </li>
          <li>
            <a href="https://amzn.to/3A3FUgy">Corsair Hydro H100i Liquid Cooler</a>
          </li>
          <li>
            <a href="https://amzn.to/3oZUOOD">MSI Pro Series Intel Z270 Motherboard</a>
          </li>
          <li>
            <a href="https://amzn.to/3JIcbNy">NZXT S340 Elite ATX Tower</a>
          </li>
          <li>
            <a href="https://amzn.to/3JAwyfj">Asus GeForce GTX 1080 GPU</a>
          </li>
        </ul>
      </section>
    </Layout>
  );
}

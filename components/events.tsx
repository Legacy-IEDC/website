"use client";
import { arch } from "os";
import React, { useState } from "react";
import Slider from "react-slick";
import { Montserrat } from "next/font/google";
const font = Montserrat({ subsets: ["latin"] });

const Event = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings: SliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,

    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  interface Event {
    title: string;
    date: string;
    image: string;
  }

  interface SliderSettings {
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    autoplay: boolean;
    arrows: boolean;
    beforeChange: (current: number, next: number) => void;
    responsive: {
      breakpoint: number;
      settings: {
        slidesToShow: number;
      };
    }[];
  }

  const events = [
    {
      title: "I-Plan",
      date: "12/03/2024 - 04/03/2024",
      image: "/images/iplan.png",
    },
    {
      title: "Affiliate Marketing",
      date: "01/12/2023",
      image: "/images/affiliate-marketing.png",
    },
    {
      title: "Origami Workshop",
      date: "06/12/2024",
      image: "/images/origami-workshop.png",
    },
    // Add more events as needed
  ];

  const getMiddleSlideIndex = (index: number) => {
    const middleIndex = Math.floor(events.length / 2);
    if (index === events.length - 1) {
      return 0; // Return to the first slide at the end
    }
    return (index + middleIndex) % events.length;
  };

  return (
    <div className={` ${font.className}py-8 bg-black text-white`}>
      <h2 className="text-center text-4xl font-bold pt-20">Our Events</h2>
      <div className="flex justify-center mt-20 pb-10">
        <Slider {...settings} className="w-full max-w-6xl">
          {events.map((event, index) => (
            <div
              key={index}
              className={`event-card  ${
                index === getMiddleSlideIndex(currentSlide) ? "active" : ""
              }`}
            >
              <div className="bg-black h-[32rem] p-6 w-full sm:w-[20rem] rounded-lg border border-yellow-500 relative">
                <div className="h-[20rem] w-full bg-slate-500 rounded-lg">
                  <img
                    src={event.image}
                    alt={event.title}
                    className=" object-cover mb-4 rounded-lg"
                  />
                </div>

                <div className="flex flex-col items-center justify-center mt-5">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-sm mb-4">{event.date}</p>
                  <a
                    href="/events"
                    className=" bg-yellow-500 text-black px-4 py-2 rounded"
                  >
                    View More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Event;
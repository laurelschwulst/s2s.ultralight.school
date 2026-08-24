const entries = [
    {
      id: "amy",
      order: 14,
      vessel: {
        outline: "/vessels/outline/Amy.svg",
        fill: "/vessels/fill/Amy.svg",
        x: 26, y: 13,
        width: 38,
        fillColor: "#A7C2D5",
        tilt: -10
      },
      text: {
        label: "Amy",
        title: "{hatched striations, the curl at the end of an unraveling thread}",
        body: "/text/amy.html",
        author: "Amy Fang",
        bgColor: "#A7C2D5",
        tilt: 1.25,
        transform: 0.5,
        image: "/images/amy.jpg"
      },
      audio: {
        src: "/audio/amy.mp3"
      }
    },
    {
      id: "angie",
      order: 3,
      vessel: {
        outline: "/vessels/outline/Angie.svg",
        fill: "/vessels/fill/Angie.svg",
        x: 64, y: 16,
        width: 120,
        fillColor: "#E07A6A",
        tilt: 12
      },
      text: {
        label: "Angie",
        title: "Journey, through phosphenes",
        body: "/text/angie.html",
        author: "Angie Pai",
        bgColor: "#E07A6A",
        tilt: -2.5,
        transform: 1.75,
        image: "/images/angie.jpg"
      },
      audio: {
        src: "/audio/angie.mp3"
      }
    },
    {
      id: "anna",
      order: 9,
      vessel: {
        outline: "/vessels/outline/Anna.svg",
        fill: "/vessels/fill/Anna.svg",
        x: 67, y: 78,
        width: 76,
        fillColor: "#B1B753",
        tilt: -8
      },
      text: {
        label: "Anna",
        title: "Thick",
        body: "/text/anna.html",
        author: "Anna Kuo",
        bgColor: "#B1B753",
        tilt: -1.25,
        transform: 1.75,
        image: "/images/anna.jpg"
      },
      audio: {
        src: "/audio/anna.mp3"
      }
    },
    {
      id: "april",
      order: 5,
      vessel: {
        outline: "/vessels/outline/April.svg",
        fill: "/vessels/fill/April.svg",
        x: 51, y: 38,
        width: 68,
        fillColor: "#F3D27B",
        tilt: 9
      },
      text: {
        label: "April",
        title: "Silence's Friends",
        body: "/text/april.html",
        author: "April Jung",
        bgColor: "#F3D27B",
        tilt: -0.5,
        transform: 0.75
      },
      audio: {
        src: "/audio/april.mp3"
      }
    },
    {
      id: "helena",
      order: 4,
      vessel: {
        outline: "/vessels/outline/Helena.svg",
        fill: "/vessels/fill/Helena.svg",
        x: 19, y: 54,
        width: 150,
        fillColor: "#B1B753",
        tilt: -14
      },
      text: {
        label: "Helena",
        title: "The Dithering Texture of Moss",
        body: "/text/helena.html",
        author: "Helena Dong",
        bgColor: "#B1B753",
        tilt: 1.1,
        transform: 0,
        image: "/images/helena.jpeg"
      },
      audio: {
        src: "/audio/helena.mp3"
      }
    },
    {
      id: "jianna",
      order: 13,
      vessel: {
        outline: "/vessels/outline/Jianna.svg",
        fill: "/vessels/fill/Jianna.svg",
        x: 69, y: 48,
        width: 96,
        fillColor: "#BEDBC9",
        tilt: 11
      },
      text: {
        label: "Jianna",
        title: "White Flower",
        body: "/text/jianna.html",
        author: "Jianna So",
        bgColor: "#BEDBC9",
        tilt: 1.75,
        transform: 0.75,
        image: "/images/jianna.jpg"
      },
      audio: {
        src: "/audio/jianna.mp3"
      }
    },
    {
      id: "leah",
      order: 1,
      vessel: {
        outline: "/vessels/outline/Leah.svg",
        fill: "/vessels/fill/Leah.svg",
        x: 24, y: 32,
        width: 68,
        fillColor: "#BEDBC9",
        tilt: -11
      },
      text: {
        label: "Leah",
        title: "Night/Morning",
        body: "/text/leah.html",
        author: "Leah Koransky",
        bgColor: "#BEDBC9",
        tilt: -1,
        transform: 1,
        image: "/images/leah.jpg"
      },
      audio: {
        src: "/audio/leah.mp3"
      }
    },
    {
      id: "lisa",
      order: 10,
      vessel: {
        outline: "/vessels/outline/Lisa.svg",
        fill: "/vessels/fill/Lisa.svg",
        x: 20, y: 68,
        width: 160,
        fillColor: "#F3D27B",
        tilt: 8
      },
      text: {
        label: "Lisa",
        title: "Corn Time",
        body: "/text/lisa.html",
        author: "Lisa Yoder",
        bgColor: "#F3D27B",
        tilt: 2.1,
        transform: 0.5,
        image: "/images/lisa.jpg"
      },
      audio: {
        src: "/audio/lisa.mp3"
      }
    },
    {
      id: "liz",
      order: 2,
      vessel: {
        outline: "/vessels/outline/Liz.svg",
        fill: "/vessels/fill/Liz.svg",
        x: 48, y: 68,
        width: 81,
        fillColor: "#A7C2D5",
        tilt: -9
      },
      text: {
        label: "Liz",
        title: "Long Lines",
        body: "/text/liz.html",
        author: "Liz Ellis",
        bgColor: "#A7C2D5",
        tilt: -1.5,
        transform: 0.5
      },
      audio: {
        src: "/audio/liz.mp3"
      }
    },
    {
      id: "liza",
      order: 8,
      vessel: {
        outline: "/vessels/outline/Liza.svg",
        fill: "/vessels/fill/Liza.svg",
        x: 68, y: 24,
        width: 142,
        fillColor: "#CEC0A3",
        tilt: 13
      },
      text: {
        label: "Liza",
        title: "bird score",
        body: "/text/liza.html",
        author: "Liza Pittard",
        bgColor: "#CEC0A3",
        tilt: 2,
        transform: 1.75,
        image: "/images/liza.jpg"
      },
      audio: {
        src: "/audio/liza.mp3"
      }
    },
    {
      id: "editors",
      order: 0,
      vessel: {
        outline: "/vessels/outline/editors.svg",
        fill: "/vessels/fill/editors.svg",
        x: 39, y: 26,
        width: 130,
        fillColor: "#FFFFF2",
        tilt: -7
      },
      text: {
        label: "editors",
        title: "Editors' Letter",
        body: "/text/editors.html",
        author: "Laurel Schwulst & Meg Miller",
        bgColor: "#FFFFF2",
        tilt: 0,
        transform: 1.5
      },
      audio: {
        src: "/audio/meg-laurel.mp3"
      }
    },
    {
      id: "nicci",
      order: 6,
      vessel: {
        outline: "/vessels/outline/Nicci.svg",
        fill: "/vessels/fill/Nicci.svg",
        x: 40, y: 47,
        width: 102,
        fillColor: "#CEC0A3",
        tilt: 10
      },
      text: {
        label: "Nicci",
        title: "My Body is a State Machine",
        body: "/text/nicci.html",
        author: "Nicci Yin",
        bgColor: "#CEC0A3",
        tilt: -1.5,
        transform: 0.5,
        image: "/images/nicci.jpg"
      },
      audio: {
        src: "/audio/nicci.mp3"
      }
    },
    {
      id: "sarah",
      order: 11,
      vessel: {
        outline: "/vessels/outline/Sarah.svg",
        fill: "/vessels/fill/Sarah.svg",
        x: 74, y: 66,
        width: 114,
        fillColor: "#E07A6A",
        tilt: -12
      },
      text: {
        label: "Sarah",
        title: "Untitled perfume review",
        body: "/text/sarah.html",
        author: "Sarah Chefka",
        bgColor: "#E07A6A",
        tilt: 0.5,
        transform: 0,
        image: "/images/sarah.jpg"
      },
      audio: {
        src: "/audio/sarah.mp3"
      }
    },
    {
      id: "vyanka",
      order: 12,
      vessel: {
        outline: "/vessels/outline/Vyanka.svg",
        fill: "/vessels/fill/Vyanka.svg",
        x: 50, y: 59,
        width: 121,
        fillColor: "#92B191",
        tilt: 7
      },
      text: {
        label: "Vyanka",
        title: "Before Anyone Leaves",
        body: "/text/vyanka.html",
        author: "Vyanka Sotelo",
        bgColor: "#92B191",
        tilt: -1,
        transform: 0.75,
        image: "/images/vyanka.jpg"
      },
      audio: {
        src: "/audio/vyanka.mp3"
      }
    },
    {
      id: "yoyo",
      order: 7,
      vessel: {
        outline: "/vessels/outline/YoYo.svg",
        fill: "/vessels/fill/YoYo.svg",
        x: 44, y: 8,
        width: 63,
        fillColor: "#92B191",
        tilt: -15
      },
      text: {
        label: "YoYo",
        title: "you laid with me",
        body: "/text/yo-yo.html",
        author: "Yo-Yo Lin",
        bgColor: "#92B191",
        tilt: -2.25,
        transform: 1,
        image: "/images/yo-yo.jpg"
      },
      audio: {
        src: "/audio/yoyo.mp3"
      }
    }
  ];
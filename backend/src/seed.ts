import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  try {
    // Test database connection
    console.log("Testing database connection...");
    await prisma.$connect();
    console.log("Database connection successful!");

    // Create countries first
    console.log("Creating countries...");
    const countries = await createCountries();
    console.log(`Created ${countries.length} countries`);

    // Create states
    console.log("Creating states...");
    const states = await createStates();
    console.log(`Created ${states.length} states`);

    // Create cities
    console.log("Creating cities...");
    const cities = await createCities();
    console.log(`Created ${cities.length} cities`);

    // Create streams
    console.log("Creating streams...");
    const streams = await createStreams();
    console.log(`Created ${streams.length} streams`);

    // Create colleges
    console.log("Creating colleges...");
    const colleges = await createColleges(
      streams[0].id,
      cities[0].id,
      states[0].id,
      countries[0].id
    );
    console.log(`Created ${colleges.length} colleges`);

    // Create courses
    console.log("Creating courses...");
    const courses = await createCourses(streams);
    console.log(`Created ${courses.length} courses`);

    // Create college courses
    console.log("Creating college courses...");
    await createCollegesCourses(colleges, courses, streams);

    // Create articles
    console.log("Creating articles...");
    await createArticles();

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

async function createCountries() {
  console.log("Creating countries...");

  const countryData = [
    { name: "India", slug: "india" },
    { name: "United States", slug: "united-states" },
    { name: "Canada", slug: "canada" },
    { name: "United Kingdom", slug: "united-kingdom" },
    { name: "Australia", slug: "australia" },
  ];

  const countries = [];

  for (const data of countryData) {
    const existingCountry = await prisma.country.findUnique({
      where: { slug: data.slug },
    });

    if (!existingCountry) {
      const country = await prisma.country.create({
        data,
      });
      countries.push(country);
      console.log(`Created country: ${country.name}`);
    } else {
      countries.push(existingCountry);
      console.log(`Country ${existingCountry.name} already exists`);
    }
  }

  return countries;
}

async function createStates() {
  console.log("Creating states...");

  const stateData = [
    { name: "Maharashtra", slug: "maharashtra" },
    { name: "Gujarat", slug: "gujarat" },
    { name: "Karnataka", slug: "karnataka" },
    { name: "Delhi", slug: "delhi" },
    { name: "Tamil Nadu", slug: "tamil-nadu" },
  ];

  const states = [];

  for (const data of stateData) {
    const existingState = await prisma.state.findUnique({
      where: { slug: data.slug },
    });

    if (!existingState) {
      const state = await prisma.state.create({
        data,
      });
      states.push(state);
      console.log(`Created state: ${state.name}`);
    } else {
      states.push(existingState);
      console.log(`State ${existingState.name} already exists`);
    }
  }

  return states;
}

async function createCities() {
  console.log("Creating cities...");

  const cityData = [
    { name: "Mumbai", slug: "mumbai" },
    { name: "Ahmedabad", slug: "ahmedabad" },
    { name: "Bangalore", slug: "bangalore" },
    { name: "Delhi", slug: "delhi" },
    { name: "Chennai", slug: "chennai" },
  ];

  const cities = [];

  for (const data of cityData) {
    const existingCity = await prisma.city.findUnique({
      where: { slug: data.slug },
    });

    if (!existingCity) {
      const city = await prisma.city.create({
        data,
      });
      cities.push(city);
      console.log(`Created city: ${city.name}`);
    } else {
      cities.push(existingCity);
      console.log(`City ${existingCity.name} already exists`);
    }
  }

  return cities;
}

async function createStreams() {
  console.log("Creating streams...");

  const streamData = [
    { name: "Engineering", slug: "engineering" },
    { name: "Management", slug: "management" },
    { name: "Design", slug: "design" },
    { name: "Law", slug: "law" },
    { name: "Medical", slug: "medical" },
  ];

  const streams = [];

  for (const data of streamData) {
    const existingStream = await prisma.stream.findUnique({
      where: { slug: data.slug },
    });

    if (!existingStream) {
      const stream = await prisma.stream.create({
        data,
      });
      streams.push(stream);
      console.log(`Created stream: ${stream.name}`);
    } else {
      streams.push(existingStream);
      console.log(`Stream ${existingStream.name} already exists`);
    }
  }

  return streams;
}

async function createColleges(
  defaultStreamId: number,
  defaultCityId: number,
  defaultStateId: number,
  defaultCountryId: number
) {
  console.log("Creating colleges...");

  const collegeData = [
    {
      college_name: "Indian Institute of Technology, Mumbai",
      location: "Mumbai, Maharashtra",
      established: new Date("1958-01-01"),
      email: "contact@iitb.ac.in",
      contact: "+91-22-25722545",
      logo_url: "https://example.com/iit-mumbai-logo.png",
      bg_url: "https://example.com/iit-mumbai-bg.jpg",
      media_url: { images: ["img1.jpg", "img2.jpg"], videos: ["vid1.mp4"] },
      rating: 9.5,
      score: 950,
      intake_start_date: new Date("2025-06-01"),
      pr_pathway: false,
      slug: "iit-mumbai-" + randomUUID().substring(0, 8),
      total_students: 10000,
      acceptance_rate: 0.05,
      international_student_rate: 0.08,
      streamId: defaultStreamId,
      cityId: defaultCityId,
      stateId: defaultStateId,
      countryId: defaultCountryId,
      meta_desc:
        "IIT Mumbai is one of the premier engineering institutions in India",
      og_img: "https://example.com/iit-mumbai-og.jpg",
    },
    {
      college_name: "Indian Institute of Management, Ahmedabad",
      location: "Ahmedabad, Gujarat",
      established: new Date("1961-01-01"),
      email: "contact@iima.ac.in",
      contact: "+91-79-66324000",
      logo_url: "https://example.com/iim-ahmedabad-logo.png",
      bg_url: "https://example.com/iim-ahmedabad-bg.jpg",
      media_url: { images: ["img1.jpg", "img2.jpg"], videos: ["vid1.mp4"] },
      rating: 9.8,
      score: 980,
      intake_start_date: new Date("2025-07-01"),
      pr_pathway: false,
      slug: "iim-ahmedabad-" + randomUUID().substring(0, 8),
      total_students: 8000,
      acceptance_rate: 0.03,
      international_student_rate: 0.12,
      streamId: defaultStreamId,
      cityId: defaultCityId,
      stateId: defaultStateId,
      countryId: defaultCountryId,
      meta_desc:
        "IIM Ahmedabad is one of the premier management institutions in India",
      og_img: "https://example.com/iim-ahmedabad-og.jpg",
    },
    {
      college_name: "National Institute of Design, Ahmedabad",
      location: "Ahmedabad, Gujarat",
      established: new Date("1961-01-01"),
      email: "contact@nid.edu",
      contact: "+91-79-26629500",
      logo_url: "https://example.com/nid-ahmedabad-logo.png",
      bg_url: "https://example.com/nid-ahmedabad-bg.jpg",
      media_url: { images: ["img1.jpg", "img2.jpg"], videos: ["vid1.mp4"] },
      rating: 9.2,
      score: 920,
      intake_start_date: new Date("2025-05-01"),
      pr_pathway: false,
      slug: "nid-ahmedabad-" + randomUUID().substring(0, 8),
      total_students: 3000,
      acceptance_rate: 0.08,
      international_student_rate: 0.05,
      streamId: defaultStreamId,
      cityId: defaultCityId,
      stateId: defaultStateId,
      countryId: defaultCountryId,
      meta_desc:
        "NID Ahmedabad is one of the premier design institutions in India",
      og_img: "https://example.com/nid-ahmedabad-og.jpg",
    },
    {
      college_name: "National Law School of India University",
      location: "Bangalore, Karnataka",
      established: new Date("1986-01-01"),
      email: "contact@nls.ac.in",
      contact: "+91-80-23160537",
      logo_url: "https://example.com/nlsiu-logo.png",
      bg_url: "https://example.com/nlsiu-bg.jpg",
      media_url: { images: ["img1.jpg", "img2.jpg"], videos: ["vid1.mp4"] },
      rating: 9.4,
      score: 940,
      intake_start_date: new Date("2025-05-15"),
      pr_pathway: false,
      slug: "nlsiu-bangalore-" + randomUUID().substring(0, 8),
      total_students: 2500,
      acceptance_rate: 0.04,
      international_student_rate: 0.06,
      streamId: defaultStreamId,
      cityId: defaultCityId,
      stateId: defaultStateId,
      countryId: defaultCountryId,
      meta_desc: "NLSIU is one of the premier law institutions in India",
      og_img: "https://example.com/nlsiu-og.jpg",
    },
  ];

  const colleges = [];

  for (const data of collegeData) {
    const existingCollege = await prisma.colleges.findUnique({
      where: { slug: data.slug },
    });

    if (!existingCollege) {
      const college = await prisma.colleges.create({
        data,
      });
      colleges.push(college);
      console.log(`Created college: ${college.college_name}`);
    } else {
      colleges.push(existingCollege);
      console.log(`College ${existingCollege.college_name} already exists`);
    }
  }

  return colleges;
}

async function createCourses(streams: any[]) {
  console.log("Creating courses...");

  const courseData = [
    {
      course_name: "Bachelor of Technology",
      duration_in_months: 48,
      rating: 9.4,
      score: 940,
      streamId:
        streams.find((s) => s.name === "Engineering")?.id || streams[0].id,
      meta_desc: "B.Tech program for engineering students",
      og_img: "https://example.com/btech-og.jpg",
    },
    {
      course_name: "Master of Business Administration",
      duration_in_months: 24,
      rating: 9.7,
      score: 970,
      streamId:
        streams.find((s) => s.name === "Management")?.id || streams[0].id,
      meta_desc: "MBA program for management students",
      og_img: "https://example.com/mba-og.jpg",
    },
    {
      course_name: "Bachelor of Design",
      duration_in_months: 48,
      rating: 9.1,
      score: 910,
      streamId: streams.find((s) => s.name === "Design")?.id || streams[0].id,
      meta_desc: "B.Des program for design students",
      og_img: "https://example.com/bdes-og.jpg",
    },
    {
      course_name: "Bachelor of Laws",
      duration_in_months: 36,
      rating: 9.3,
      score: 930,
      streamId: streams.find((s) => s.name === "Law")?.id || streams[0].id,
      meta_desc: "LLB program for law students",
      og_img: "https://example.com/llb-og.jpg",
    },
    {
      course_name: "Bachelor of Medicine",
      duration_in_months: 66,
      rating: 9.6,
      score: 960,
      streamId: streams.find((s) => s.name === "Medical")?.id || streams[0].id,
      meta_desc: "MBBS program for medical students",
      og_img: "https://example.com/mbbs-og.jpg",
    },
  ];

  const courses = [];

  for (const data of courseData) {
    const existingCourse = await prisma.courses.findFirst({
      where: {
        course_name: data.course_name,
        streamId: data.streamId,
      },
    });

    if (!existingCourse) {
      const course = await prisma.courses.create({
        data,
      });
      courses.push(course);
      console.log(`Created course: ${course.course_name}`);
    } else {
      courses.push(existingCourse);
      console.log(`Course ${existingCourse.course_name} already exists`);
    }
  }

  return courses;
}

async function createCollegesCourses(
  colleges: any[],
  courses: any[],
  streams: any[]
) {
  console.log("Creating college courses...");

  for (const college of colleges) {
    // Match colleges with relevant courses
    const relevantCourses = courses.slice(0, 2); // First 2 courses for each college

    for (const course of relevantCourses) {
      const existingCollegeCourse = await prisma.collegesCourses.findFirst({
        where: {
          college_id: college.id,
          course_id: course.id,
        },
      });

      if (!existingCollegeCourse) {
        const collegeCourse = await prisma.collegesCourses.create({
          data: {
            name: `${college.college_name} - ${course.course_name}`,
            duration_in_months: course.duration_in_months,
            tution_fees: Math.floor(Math.random() * 500000) + 100000,
            hostel_fees: Math.floor(Math.random() * 100000) + 50000,
            one_time_fees: Math.floor(Math.random() * 50000) + 10000,
            other_fees: {
              library: Math.floor(Math.random() * 5000) + 1000,
              sports: Math.floor(Math.random() * 5000) + 1000,
              lab: Math.floor(Math.random() * 10000) + 5000,
            },
            college_id: college.id,
            course_id: course.id,
            streamId: course.streamId,
            meta_desc: `${course.course_name} at ${college.college_name}`,
            og_img: "https://example.com/college-course-og.jpg",
          },
        });
        console.log(`Created college course: ${collegeCourse.name}`);
      } else {
        console.log(
          `College course ${existingCollegeCourse.name} already exists`
        );
      }
    }

    // Add content to the college
    await createCollegeContent(college.id);
  }
}

async function createCollegeContent(collegeId: number) {
  const contentTypes = [
    { type: "info", title: "College Information" },
    { type: "course", title: "Courses Offered" },
    { type: "fees", title: "Fee Structure" },
    { type: "scholarship", title: "Scholarships Available" },
    { type: "placement", title: "Placement Statistics" },
  ];

  for (const { type, title } of contentTypes) {
    const existingContent = await prisma.collegewiseContent.findFirst({
      where: {
        college_id: collegeId,
        silos: type as any,
      },
    });

    if (!existingContent) {
      await prisma.collegewiseContent.create({
        data: {
          title,
          content: `This is sample content for the ${type} section of the college. It provides detailed information about ${type} related aspects of the institution.`,
          silos: type as any,
          meta_desc: `Information about college ${type}`,
          og_img: `https://example.com/${type}-og.jpg`,
          college_id: collegeId,
        },
      });
      console.log(`Created ${type} content for college ID ${collegeId}`);
    } else {
      console.log(`${type} content for college ID ${collegeId} already exists`);
    }
  }
}

async function createArticles() {
  console.log("Creating articles...");

  const articleData = [
    {
      title: "Top Engineering Colleges in India 2025",
      content:
        "A comprehensive guide to the best engineering colleges in India for the year 2025. This article covers admission procedures, eligibility criteria, and placement statistics.",
      silos: "blog" as const,
      meta_desc: "Discover the top engineering colleges in India for 2025",
      og_img: "https://example.com/engineering-colleges-og.jpg",
    },
    {
      title: "JEE Main 2025: Important Dates and Exam Pattern",
      content:
        "All you need to know about JEE Main 2025 including important dates, exam pattern, syllabus, and preparation tips for aspiring engineers.",
      silos: "exam" as const,
      meta_desc: "Complete guide to JEE Main 2025 exam",
      og_img: "https://example.com/jee-main-og.jpg",
    },
    {
      title: "MBA vs MS: Which is Better for Your Career?",
      content:
        "A detailed comparison between MBA and MS programs to help you make an informed decision about your higher education and career path.",
      silos: "course" as const,
      meta_desc: "MBA vs MS comparison for career growth",
      og_img: "https://example.com/mba-vs-ms-og.jpg",
    },
    {
      title: "Education Ministry Announces New NEP Guidelines",
      content:
        "The latest updates from the Education Ministry regarding the implementation of the New Education Policy and its impact on higher education.",
      silos: "news" as const,
      meta_desc: "Latest NEP guidelines from Education Ministry",
      og_img: "https://example.com/nep-news-og.jpg",
    },
  ];

  for (const data of articleData) {
    const existingArticle = await prisma.articles.findFirst({
      where: { title: data.title },
    });

    if (!existingArticle) {
      const article = await prisma.articles.create({
        data,
      });
      console.log(`Created article: ${article.title}`);
    } else {
      console.log(`Article "${existingArticle.title}" already exists`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

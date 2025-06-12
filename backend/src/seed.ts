import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  try {
    // Seed Countries
    const countries = await prisma.country.createMany({
      data: [
        { name: "India", slug: "india" },
        { name: "United States", slug: "united-states" },
        { name: "Canada", slug: "canada" },
        { name: "United Kingdom", slug: "united-kingdom" },
        { name: "Australia", slug: "australia" },
      ],
      skipDuplicates: true,
    });
    console.log(`Created ${countries.count} countries`);

    // Seed States
    const states = await prisma.state.createMany({
      data: [
        { name: "Delhi", slug: "delhi" },
        { name: "Mumbai", slug: "mumbai" },
        { name: "Karnataka", slug: "karnataka" },
        { name: "Tamil Nadu", slug: "tamil-nadu" },
        { name: "West Bengal", slug: "west-bengal" },
        { name: "California", slug: "california" },
        { name: "New York", slug: "new-york" },
        { name: "Ontario", slug: "ontario" },
        { name: "London", slug: "london" },
        { name: "New South Wales", slug: "new-south-wales" },
      ],
      skipDuplicates: true,
    });
    console.log(`Created ${states.count} states`);

    // Seed Cities
    const cities = await prisma.city.createMany({
      data: [
        { name: "New Delhi", slug: "new-delhi" },
        { name: "Mumbai", slug: "mumbai" },
        { name: "Bangalore", slug: "bangalore" },
        { name: "Chennai", slug: "chennai" },
        { name: "Kolkata", slug: "kolkata" },
        { name: "Pune", slug: "pune" },
        { name: "Hyderabad", slug: "hyderabad" },
        { name: "Los Angeles", slug: "los-angeles" },
        { name: "New York City", slug: "new-york-city" },
        { name: "Toronto", slug: "toronto" },
        { name: "London", slug: "london" },
        { name: "Sydney", slug: "sydney" },
      ],
      skipDuplicates: true,
    });
    console.log(`Created ${cities.count} cities`);

    // Seed Streams
    const streams = await prisma.stream.createMany({
      data: [
        { name: "Engineering", slug: "engineering" },
        { name: "Medicine", slug: "medicine" },
        { name: "Management", slug: "management" },
        { name: "Arts", slug: "arts" },
        { name: "Science", slug: "science" },
        { name: "Commerce", slug: "commerce" },
        { name: "Law", slug: "law" },
        { name: "Computer Science", slug: "computer-science" },
        { name: "Architecture", slug: "architecture" },
        { name: "Pharmacy", slug: "pharmacy" },
      ],
      skipDuplicates: true,
    });
    console.log(`Created ${streams.count} streams`);

    // Get created entities for foreign keys
    const indiaCountry = await prisma.country.findUnique({
      where: { slug: "india" },
    });
    const delhiState = await prisma.state.findUnique({
      where: { slug: "delhi" },
    });
    const delhiCity = await prisma.city.findUnique({
      where: { slug: "new-delhi" },
    });
    const engineeringStream = await prisma.stream.findUnique({
      where: { slug: "engineering" },
    });
    const medicineStream = await prisma.stream.findUnique({
      where: { slug: "medicine" },
    });
    const managementStream = await prisma.stream.findUnique({
      where: { slug: "management" },
    });

    // Seed Colleges
    const colleges = [
      {
        college_name: "Indian Institute of Technology Delhi",
        location: "New Delhi, India",
        established: new Date("1961-01-01"),
        email: "admissions@iitd.ac.in",
        contact: "+91-11-2659-1749",
        logo_url: "https://example.com/iitd-logo.png",
        bg_url: "https://example.com/iitd-bg.jpg",
        media_url: JSON.stringify([
          "https://example.com/iitd-1.jpg",
          "https://example.com/iitd-2.jpg",
        ]),
        rating: 9.2,
        score: 950,
        intake_start_date: new Date("2024-07-01"),
        pr_pathway: false,
        slug: "iit-delhi",
        total_students: 8500,
        acceptance_rate: 2.5,
        international_student_rate: 15.0,
        streamId: engineeringStream?.id || 1,
        cityId: delhiCity?.id || 1,
        stateId: delhiState?.id || 1,
        countryId: indiaCountry?.id || 1,
        meta_desc:
          "IIT Delhi is one of the premier engineering institutes in India",
        og_img: "https://example.com/iitd-og.jpg",
      },
      {
        college_name: "All India Institute of Medical Sciences",
        location: "New Delhi, India",
        established: new Date("1956-01-01"),
        email: "info@aiims.edu",
        contact: "+91-11-2659-3333",
        logo_url: "https://example.com/aiims-logo.png",
        bg_url: "https://example.com/aiims-bg.jpg",
        media_url: JSON.stringify([
          "https://example.com/aiims-1.jpg",
          "https://example.com/aiims-2.jpg",
        ]),
        rating: 9.5,
        score: 980,
        intake_start_date: new Date("2024-08-01"),
        pr_pathway: false,
        slug: "aiims-delhi",
        total_students: 2500,
        acceptance_rate: 0.5,
        international_student_rate: 5.0,
        streamId: medicineStream?.id || 2,
        cityId: delhiCity?.id || 1,
        stateId: delhiState?.id || 1,
        countryId: indiaCountry?.id || 1,
        meta_desc: "AIIMS Delhi is the premier medical institute in India",
        og_img: "https://example.com/aiims-og.jpg",
      },
      {
        college_name: "Indian Institute of Management Ahmedabad",
        location: "Ahmedabad, India",
        established: new Date("1961-01-01"),
        email: "admissions@iima.ac.in",
        contact: "+91-79-6632-4444",
        logo_url: "https://example.com/iima-logo.png",
        bg_url: "https://example.com/iima-bg.jpg",
        media_url: JSON.stringify([
          "https://example.com/iima-1.jpg",
          "https://example.com/iima-2.jpg",
        ]),
        rating: 9.0,
        score: 920,
        intake_start_date: new Date("2024-06-01"),
        pr_pathway: false,
        slug: "iim-ahmedabad",
        total_students: 1200,
        acceptance_rate: 1.0,
        international_student_rate: 20.0,
        streamId: managementStream?.id || 3,
        cityId: delhiCity?.id || 1, // Using delhi for simplicity
        stateId: delhiState?.id || 1,
        countryId: indiaCountry?.id || 1,
        meta_desc: "IIM Ahmedabad is the top business school in India",
        og_img: "https://example.com/iima-og.jpg",
      },
    ];

    for (const college of colleges) {
      await prisma.colleges.create({ data: college });
    }
    console.log(`Created ${colleges.length} colleges`);

    // Seed Courses
    const courses = [
      {
        course_name: "Bachelor of Technology",
        duration_in_months: 48,
        rating: 8.5,
        score: 850,
        streamId: engineeringStream?.id || 1,
        meta_desc: "Undergraduate engineering program",
        og_img: "https://example.com/btech-og.jpg",
      },
      {
        course_name: "Master of Technology",
        duration_in_months: 24,
        rating: 8.8,
        score: 880,
        streamId: engineeringStream?.id || 1,
        meta_desc: "Postgraduate engineering program",
        og_img: "https://example.com/mtech-og.jpg",
      },
      {
        course_name: "Bachelor of Medicine and Bachelor of Surgery",
        duration_in_months: 66,
        rating: 9.0,
        score: 900,
        streamId: medicineStream?.id || 2,
        meta_desc: "Undergraduate medical program",
        og_img: "https://example.com/mbbs-og.jpg",
      },
      {
        course_name: "Master of Business Administration",
        duration_in_months: 24,
        rating: 9.2,
        score: 920,
        streamId: managementStream?.id || 3,
        meta_desc: "Postgraduate management program",
        og_img: "https://example.com/mba-og.jpg",
      },
    ];

    for (const course of courses) {
      await prisma.courses.create({ data: course });
    }
    console.log(`Created ${courses.length} courses`);

    // Get created colleges and courses for foreign keys
    const iitDelhi = await prisma.colleges.findUnique({
      where: { slug: "iit-delhi" },
    });
    const aiims = await prisma.colleges.findUnique({
      where: { slug: "aiims-delhi" },
    });
    const iima = await prisma.colleges.findUnique({
      where: { slug: "iim-ahmedabad" },
    });

    const btechCourse = await prisma.courses.findFirst({
      where: { course_name: "Bachelor of Technology" },
    });
    const mtechCourse = await prisma.courses.findFirst({
      where: { course_name: "Master of Technology" },
    });
    const mbbsCourse = await prisma.courses.findFirst({
      where: { course_name: "Bachelor of Medicine and Bachelor of Surgery" },
    });
    const mbaCourse = await prisma.courses.findFirst({
      where: { course_name: "Master of Business Administration" },
    });

    // Seed CollegesCourses
    const collegesCourses = [
      {
        name: "B.Tech Computer Science",
        duration_in_months: 48,
        tution_fees: 250000,
        hostel_fees: 50000,
        one_time_fees: 25000,
        other_fees: JSON.stringify({ lab_fees: 10000, library_fees: 5000 }),
        college_id: iitDelhi?.id || 1,
        course_id: btechCourse?.id || 1,
        streamId: engineeringStream?.id || 1,
        meta_desc: "Computer Science Engineering at IIT Delhi",
        og_img: "https://example.com/btech-cs-og.jpg",
      },
      {
        name: "M.Tech Computer Science",
        duration_in_months: 24,
        tution_fees: 150000,
        hostel_fees: 50000,
        one_time_fees: 15000,
        other_fees: JSON.stringify({ lab_fees: 8000, library_fees: 3000 }),
        college_id: iitDelhi?.id || 1,
        course_id: mtechCourse?.id || 2,
        streamId: engineeringStream?.id || 1,
        meta_desc: "Master of Technology in Computer Science at IIT Delhi",
        og_img: "https://example.com/mtech-cs-og.jpg",
      },
      {
        name: "MBBS",
        duration_in_months: 66,
        tution_fees: 500000,
        hostel_fees: 60000,
        one_time_fees: 50000,
        other_fees: JSON.stringify({
          medical_equipment_fees: 20000,
          lab_fees: 15000,
        }),
        college_id: aiims?.id || 2,
        course_id: mbbsCourse?.id || 3,
        streamId: medicineStream?.id || 2,
        meta_desc:
          "Bachelor of Medicine and Bachelor of Surgery at AIIMS Delhi",
        og_img: "https://example.com/mbbs-og.jpg",
      },
      {
        name: "MBA",
        duration_in_months: 24,
        tution_fees: 2500000,
        hostel_fees: 100000,
        one_time_fees: 100000,
        other_fees: JSON.stringify({
          case_study_fees: 25000,
          library_fees: 10000,
        }),
        college_id: iima?.id || 3,
        course_id: mbaCourse?.id || 4,
        streamId: managementStream?.id || 3,
        meta_desc: "Master of Business Administration at IIM Ahmedabad",
        og_img: "https://example.com/mba-og.jpg",
      },
    ];

    for (const collegeCourse of collegesCourses) {
      await prisma.collegesCourses.create({ data: collegeCourse });
    }
    console.log(`Created ${collegesCourses.length} college courses`);

    // Seed CollegewiseContent
    const collegewiseContent = [
      {
        title: "About IIT Delhi",
        content:
          "IIT Delhi is one of the premier engineering institutes in India, established in 1961. It offers undergraduate, postgraduate, and doctoral programs in engineering, technology, and sciences.",
        silos: "info",
        college_id: iitDelhi?.id || 1,
        meta_desc: "Information about IIT Delhi",
        og_img: "https://example.com/iitd-info-og.jpg",
      },
      {
        title: "IIT Delhi Placement Statistics",
        content:
          "IIT Delhi has excellent placement records with top companies like Google, Microsoft, Amazon recruiting students. The average package is around 15-20 LPA.",
        silos: "placement",
        college_id: iitDelhi?.id || 1,
        meta_desc: "IIT Delhi placement information",
        og_img: "https://example.com/iitd-placement-og.jpg",
      },
      {
        title: "AIIMS Delhi Medical Programs",
        content:
          "AIIMS Delhi offers comprehensive medical education with state-of-the-art facilities and renowned faculty. The institute is known for its research and clinical excellence.",
        silos: "course",
        college_id: aiims?.id || 2,
        meta_desc: "AIIMS Delhi course information",
        og_img: "https://example.com/aiims-course-og.jpg",
      },
    ];

    for (const content of collegewiseContent) {
      await prisma.collegewiseContent.create({
        data: {
          ...content,
          silos: content.silos as any,
        },
      });
    }
    console.log(
      `Created ${collegewiseContent.length} collegewise content entries`
    );

    // Seed Articles
    const articles = [
      {
        title: "JEE Main 2024 Results Announced",
        content:
          "The Joint Entrance Examination (JEE) Main 2024 results have been announced. Students can check their results on the official website.",
        silos: "exam",
        meta_desc: "JEE Main 2024 results announcement",
        og_img: "https://example.com/jee-results-og.jpg",
      },
      {
        title: "Top Engineering Colleges in India 2024",
        content:
          "A comprehensive list of the top engineering colleges in India for 2024, including IITs, NITs, and other premier institutions.",
        silos: "blog",
        meta_desc: "Top engineering colleges in India 2024",
        og_img: "https://example.com/top-colleges-og.jpg",
      },
      {
        title: "New Education Policy Impact on Higher Education",
        content:
          "The New Education Policy 2020 has brought significant changes to the higher education landscape in India.",
        silos: "news",
        meta_desc: "NEP 2020 impact on higher education",
        og_img: "https://example.com/nep-og.jpg",
      },
    ];

    for (const article of articles) {
      await prisma.articles.create({
        data: {
          ...article,
          silos: article.silos as any,
        },
      });
    }
    console.log(`Created ${articles.length} articles`);

    await prisma.subscription.createMany({
      data: [
        {
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          phn_no: "+91-7654321098",
        },
        {
          name: "Bob Wilson",
          email: "bob.wilson@example.com",
          phn_no: "+91-6543210987",
        },
      ],
      skipDuplicates: true,
    });
    console.log("Created sample subscriptions");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
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

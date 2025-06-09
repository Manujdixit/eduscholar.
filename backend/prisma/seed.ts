import { PrismaClient } from "@prisma/client";
import {
  CollegesPrimaryStream,
  ArticlesSilos,
  CollegewiseContentSilos,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.collegesCourses.deleteMany({});
  await prisma.collegewiseContent.deleteMany({});
  await prisma.articles.deleteMany({});
  await prisma.leadForm.deleteMany({});
  await prisma.subsciption.deleteMany({});
  await prisma.colleges.deleteMany({});
  await prisma.courses.deleteMany({});

  console.log("Database cleaned");

  // Create colleges
  const collegeIds = await Promise.all([
    prisma.colleges.create({
      data: {
        college_name: "MIT Institute of Technology",
        location: "Pune, Maharashtra",
        established: new Date("1983-01-15"),
        email: "admissions@mit.edu",
        contact: "9876543210",
        logo_url: "https://example.com/mit_logo.png",
        bg_url: "https://example.com/mit_bg.jpg",
        media_url: JSON.stringify({
          images: ["url1", "url2"],
          videos: ["video1"],
        }),
        rating: 8.7,
        score: 856,
        primary_stream: CollegesPrimaryStream.Engineering,
        intake_start_date: new Date("2025-06-01"),
        pr_pathway: true,
        slug: "mit-institute-technology",
        meta_desc: "Leading engineering college in Pune",
        og_img: "https://example.com/mit_og.jpg",
      },
    }),
    prisma.colleges.create({
      data: {
        college_name: "Harvard Business School",
        location: "Mumbai, Maharashtra",
        established: new Date("1975-03-20"),
        email: "info@hbs.edu",
        contact: "8765432109",
        logo_url: "https://example.com/hbs_logo.png",
        bg_url: "https://example.com/hbs_bg.jpg",
        media_url: JSON.stringify({
          images: ["url1", "url2"],
          videos: ["video1"],
        }),
        rating: 9.2,
        score: 920,
        primary_stream: CollegesPrimaryStream.Management,
        intake_start_date: new Date("2025-07-15"),
        pr_pathway: false,
        slug: "harvard-business-school",
        meta_desc: "Premier business school in India",
        og_img: "https://example.com/hbs_og.jpg",
      },
    }),
    prisma.colleges.create({
      data: {
        college_name: "National Institute of Design",
        location: "Delhi, India",
        established: new Date("1990-05-10"),
        email: "admissions@nid.edu",
        contact: "7654321098",
        logo_url: "https://example.com/nid_logo.png",
        bg_url: "https://example.com/nid_bg.jpg",
        media_url: JSON.stringify({
          images: ["url1", "url2"],
          videos: ["video1"],
        }),
        rating: 8.5,
        score: 850,
        primary_stream: CollegesPrimaryStream.Design,
        intake_start_date: new Date("2025-08-01"),
        pr_pathway: false,
        slug: "national-institute-design",
        meta_desc: "Top design institute in India",
        og_img: "https://example.com/nid_og.jpg",
      },
    }),
    prisma.colleges.create({
      data: {
        college_name: "National Law School",
        location: "Bangalore, Karnataka",
        established: new Date("1988-08-25"),
        email: "info@nls.edu",
        contact: "6543210987",
        logo_url: "https://example.com/nls_logo.png",
        bg_url: "https://example.com/nls_bg.jpg",
        media_url: JSON.stringify({
          images: ["url1", "url2"],
          videos: ["video1"],
        }),
        rating: 9.0,
        score: 900,
        primary_stream: CollegesPrimaryStream.Law,
        intake_start_date: new Date("2025-06-15"),
        pr_pathway: true,
        slug: "national-law-school",
        meta_desc: "Premier law institution in India",
        og_img: "https://example.com/nls_og.jpg",
      },
    }),
  ]);

  console.log("Colleges created");

  // Create courses
  const courseIds = await Promise.all([
    prisma.courses.create({
      data: {
        course_name: "Computer Science Engineering",
        duration_in_months: 48,
        rating: 9.1,
        score: 910,
        meta_desc:
          "Learn computer science fundamentals and advanced programming",
        og_img: "https://example.com/cse_og.jpg",
      },
    }),
    prisma.courses.create({
      data: {
        course_name: "MBA in Marketing",
        duration_in_months: 24,
        rating: 8.5,
        score: 850,
        meta_desc: "Advanced marketing strategies and business management",
        og_img: "https://example.com/mba_og.jpg",
      },
    }),
    prisma.courses.create({
      data: {
        course_name: "Graphic Design",
        duration_in_months: 36,
        rating: 8.7,
        score: 870,
        meta_desc: "Learn design principles and tools",
        og_img: "https://example.com/design_og.jpg",
      },
    }),
    prisma.courses.create({
      data: {
        course_name: "LLB - Criminal Law",
        duration_in_months: 36,
        rating: 8.9,
        score: 890,
        meta_desc: "Study criminal law and legal procedures",
        og_img: "https://example.com/llb_og.jpg",
      },
    }),
  ]);

  console.log("Courses created");

  // Create college courses
  await Promise.all([
    prisma.collegesCourses.create({
      data: {
        name: "B.Tech Computer Science",
        duration_in_months: 48,
        tution_fees: 120000,
        hostel_fees: 60000,
        one_time_fees: 25000,
        other_fees: JSON.stringify({
          library: 5000,
          laboratory: 10000,
          sports: 3000,
        }),
        meta_desc: "Bachelor of Technology in Computer Science",
        og_img: "https://example.com/btech_cs_og.jpg",
        college_id: collegeIds[0].id,
        course_id: courseIds[0].id,
      },
    }),
    prisma.collegesCourses.create({
      data: {
        name: "MBA Marketing",
        duration_in_months: 24,
        tution_fees: 200000,
        hostel_fees: 80000,
        one_time_fees: 35000,
        other_fees: JSON.stringify({
          library: 6000,
          case_studies: 15000,
          extracurriculars: 5000,
        }),
        meta_desc: "Master of Business Administration in Marketing",
        og_img: "https://example.com/mba_marketing_og.jpg",
        college_id: collegeIds[1].id,
        course_id: courseIds[1].id,
      },
    }),
    prisma.collegesCourses.create({
      data: {
        name: "Diploma in Graphic Design",
        duration_in_months: 36,
        tution_fees: 95000,
        hostel_fees: 55000,
        one_time_fees: 20000,
        other_fees: JSON.stringify({
          materials: 12000,
          software_licenses: 8000,
          exhibitions: 5000,
        }),
        meta_desc: "Professional Diploma in Graphic Design",
        og_img: "https://example.com/diploma_gd_og.jpg",
        college_id: collegeIds[2].id,
        course_id: courseIds[2].id,
      },
    }),
    prisma.collegesCourses.create({
      data: {
        name: "Bachelor of Law",
        duration_in_months: 36,
        tution_fees: 150000,
        hostel_fees: 70000,
        one_time_fees: 30000,
        other_fees: JSON.stringify({
          library: 7000,
          moot_courts: 10000,
          field_visits: 5000,
        }),
        meta_desc: "Bachelor of Law with specialization in Criminal Law",
        og_img: "https://example.com/llb_og.jpg",
        college_id: collegeIds[3].id,
        course_id: courseIds[3].id,
      },
    }),
  ]);

  console.log("College courses created");

  // Create collegewiseContent
  await Promise.all([
    prisma.collegewiseContent.create({
      data: {
        title: "About MIT Institute of Technology",
        content:
          "MIT Institute of Technology is a premier engineering institute established in 1983. The institute offers various undergraduate and postgraduate programs in engineering and technology.",
        silos: CollegewiseContentSilos.info,
        meta_desc: "Information about MIT Institute of Technology",
        og_img: "https://example.com/mit_info_og.jpg",
        college_id: collegeIds[0].id,
      },
    }),
    prisma.collegewiseContent.create({
      data: {
        title: "Courses at Harvard Business School",
        content:
          "Harvard Business School offers a wide range of management courses including MBA, Executive MBA, and specialized management programs.",
        silos: CollegewiseContentSilos.course,
        meta_desc: "Courses offered at Harvard Business School",
        og_img: "https://example.com/hbs_courses_og.jpg",
        college_id: collegeIds[1].id,
      },
    }),
    prisma.collegewiseContent.create({
      data: {
        title: "Scholarships at National Institute of Design",
        content:
          "NID offers various merit-based scholarships to deserving students. Scholarships cover tuition fees and provide monthly stipends.",
        silos: CollegewiseContentSilos.scholarship,
        meta_desc: "Scholarship opportunities at National Institute of Design",
        og_img: "https://example.com/nid_scholarship_og.jpg",
        college_id: collegeIds[2].id,
      },
    }),
    prisma.collegewiseContent.create({
      data: {
        title: "Placement Records at National Law School",
        content:
          "National Law School has an excellent placement record with top law firms and corporations recruiting students with attractive packages.",
        silos: CollegewiseContentSilos.placement,
        meta_desc: "Placement statistics of National Law School",
        og_img: "https://example.com/nls_placement_og.jpg",
        college_id: collegeIds[3].id,
      },
    }),
  ]);

  console.log("College content created");

  // Create articles
  await Promise.all([
    prisma.articles.create({
      data: {
        title: "Top Engineering Colleges in India 2025",
        content:
          "A comprehensive guide to the top engineering colleges in India for 2025 admissions. Includes rankings, cutoff marks, and admission procedures.",
        silos: ArticlesSilos.news,
        meta_desc: "Guide to top engineering colleges in India",
        og_img: "https://example.com/engg_colleges_og.jpg",
      },
    }),
    prisma.articles.create({
      data: {
        title: "How to Prepare for CAT 2025",
        content:
          "Expert tips and strategies to crack the Common Admission Test (CAT) for MBA admissions in 2025. Includes study plan and important topics.",
        silos: ArticlesSilos.exam,
        meta_desc: "CAT 2025 preparation guide",
        og_img: "https://example.com/cat_prep_og.jpg",
      },
    }),
    prisma.articles.create({
      data: {
        title: "Career Prospects After MBA in Marketing",
        content:
          "Explore the various career opportunities available after completing an MBA in Marketing. Learn about job roles, salary expectations, and growth prospects.",
        silos: ArticlesSilos.course,
        meta_desc: "Career options after MBA in Marketing",
        og_img: "https://example.com/mba_career_og.jpg",
      },
    }),
    prisma.articles.create({
      data: {
        title: "Choosing Between NEET and JEE: A Student's Dilemma",
        content:
          "A detailed blog discussing the factors to consider when choosing between medical (NEET) and engineering (JEE) entrance exams. Includes expert opinions and student experiences.",
        silos: ArticlesSilos.blog,
        meta_desc: "Guide to choosing between NEET and JEE",
        og_img: "https://example.com/neet_jee_og.jpg",
      },
    }),
  ]);

  console.log("Articles created");

  // Create lead form entries
  await Promise.all([
    prisma.leadForm.create({
      data: {
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phn_no: "9876543210",
      },
    }),
    prisma.leadForm.create({
      data: {
        name: "Priya Patel",
        email: "priya.patel@example.com",
        phn_no: "8765432109",
      },
    }),
  ]);

  console.log("Lead form entries created");

  // Create subscription entries
  await Promise.all([
    prisma.subsciption.create({
      data: {
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
        phn_no: "7654321098",
      },
    }),
    prisma.subsciption.create({
      data: {
        name: "Sneha Gupta",
        email: "sneha.gupta@example.com",
        phn_no: "6543210987",
      },
    }),
  ]);

  console.log("Subscription entries created");

  console.log("Database seeding completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

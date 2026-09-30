const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const today = new Date().toISOString().split("T")[0];
  
  // Calculate tomorrow and day after
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

  const saturdayDate = new Date();
  saturdayDate.setDate(saturdayDate.getDate() + 3);
  const upcomingSat = saturdayDate.toISOString().split("T")[0];

  const sampleBookings = [
    {
      bookingCode: "KS-2026-00128",
      customerName: "Ahmad Hendra & Rekan",
      phone: "081234567890",
      email: "ahmad.hendra@gmail.com",
      date: today,
      time: "19:30",
      guestCount: 4,
      seating: "Indoor",
      specialRequest: "Near the window if possible, celebration dinner.",
      occasion: "Dining",
      status: "confirmed",
    },
    {
      bookingCode: "KS-2026-00129",
      customerName: "Ibu Rina Kartika",
      phone: "082188992211",
      email: "rina.kartika@yahoo.com",
      date: today,
      time: "18:00",
      guestCount: 6,
      seating: "Indoor",
      specialRequest: "Family gathering with parents.",
      occasion: "Family Gathering",
      status: "confirmed",
    },
    {
      bookingCode: "KS-2026-00130",
      customerName: "Bpk. Suryo Pratama",
      phone: "081977665544",
      email: "suryo.pratama@ptbintang.co.id",
      date: today,
      time: "19:00",
      guestCount: 8,
      seating: "Private Room",
      specialRequest: "Business dinner with board members.",
      occasion: "Business Dinner",
      status: "confirmed",
    },
    {
      bookingCode: "KS-2026-00131",
      customerName: "Dian & Dimas",
      phone: "085733441122",
      email: "dian.dimas@outlook.com",
      date: today,
      time: "20:00",
      guestCount: 2,
      seating: "Outdoor",
      specialRequest: "Quiet romantic table for anniversary.",
      occasion: "Anniversary",
      status: "confirmed",
    },
    {
      bookingCode: "KS-2026-00132",
      customerName: "Dr. Maya Susanti",
      phone: "081399887766",
      email: "maya.susanti@gmail.com",
      date: tomorrow,
      time: "19:30",
      guestCount: 5,
      seating: "Indoor",
      specialRequest: "Birthday dessert surprise request.",
      occasion: "Birthday Celebration",
      status: "confirmed",
    },
    {
      bookingCode: "KS-2026-00133",
      customerName: "Keluarga Besar Bpk. Anton",
      phone: "081299881144",
      email: "anton.wijaya@gmail.com",
      date: upcomingSat,
      time: "18:30",
      guestCount: 12,
      seating: "Private Room",
      specialRequest: "Reuni keluarga besar, butuh set menu nusantara.",
      occasion: "Family Gathering",
      status: "confirmed",
    },
  ];

  console.log("Seeding sample reservations...");
  for (const b of sampleBookings) {
    await prisma.reservation.upsert({
      where: { bookingCode: b.bookingCode },
      update: {},
      create: b,
    });
  }

  console.log("Sample reservations seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

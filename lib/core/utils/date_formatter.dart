import 'package:intl/intl.dart';

class DateFormatter {
  static const List<String> _daysIndonesian = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu'
  ];

  static const List<String> _monthsIndonesian = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  static const List<String> _shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Ags',
    'Sep',
    'Okt',
    'Nov',
    'Des'
  ];

  /// e.g. "Rabu, 30 September 2026"
  static String formatFull(DateTime date) {
    final dayName = _daysIndonesian[date.weekday - 1];
    final monthName = _monthsIndonesian[date.month - 1];
    return '$dayName, ${date.day} $monthName ${date.year}';
  }

  /// e.g. "30 Sep 2026"
  static String formatMedium(DateTime date) {
    final monthName = _shortMonths[date.month - 1];
    return '${date.day} $monthName ${date.year}';
  }

  /// e.g. "30 Sep 2026 19:45"
  static String formatDateTime(DateTime date) {
    final monthName = _shortMonths[date.month - 1];
    final hour = date.hour.toString().padLeft(2, '0');
    final minute = date.minute.toString().padLeft(2, '0');
    return '${date.day} $monthName ${date.year} $hour:$minute';
  }

  /// e.g. "19:45"
  static String formatTime(DateTime date) {
    final hour = date.hour.toString().padLeft(2, '0');
    final minute = date.minute.toString().padLeft(2, '0');
    return '$hour:$minute';
  }

  /// Format as ISO date "YYYY-MM-DD"
  static String toIsoDate(DateTime date) {
    return DateFormat('yyyy-MM-dd').format(date);
  }

  /// Parse ISO date "YYYY-MM-DD" or fallback
  static DateTime parseIsoDate(String dateStr) {
    try {
      return DateTime.parse(dateStr);
    } catch (_) {
      return DateTime.now();
    }
  }

  /// Return day abbreviation: "Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"
  static String getDayAbbr(int weekday) {
    const abbr = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    if (weekday >= 1 && weekday <= 7) {
      return abbr[weekday - 1];
    }
    return '';
  }
}

import 'package:flutter/material.dart';
import '../models/dashboard_summary_model.dart';
import '../repositories/report_repository.dart';

class ReportProvider extends ChangeNotifier {
  final ReportRepository _reportRepo;

  ReportProvider({ReportRepository? reportRepo}) : _reportRepo = reportRepo ?? ReportRepository();

  DashboardSummaryModel _dashboardSummary = DashboardSummaryModel.empty();
  ReportSummaryModel _reportSummary = ReportSummaryModel.empty();

  bool _isLoadingDashboard = false;
  bool _isLoadingReport = false;

  String _selectedFilter = 'today'; // 'today', 'yesterday', '7days', 'this_month', 'custom'
  DateTime _startDate = DateTime.now();
  DateTime _endDate = DateTime.now();

  DashboardSummaryModel get dashboardSummary => _dashboardSummary;
  ReportSummaryModel get reportSummary => _reportSummary;
  bool get isLoadingDashboard => _isLoadingDashboard;
  bool get isLoadingReport => _isLoadingReport;
  String get selectedFilter => _selectedFilter;
  DateTime get startDate => _startDate;
  DateTime get endDate => _endDate;

  Future<void> loadDashboardSummary() async {
    _isLoadingDashboard = true;
    notifyListeners();

    try {
      _dashboardSummary = await _reportRepo.getDashboardSummary();
    } catch (e) {
      debugPrint('Error loading dashboard summary: $e');
    } finally {
      _isLoadingDashboard = false;
      notifyListeners();
    }
  }

  Future<void> loadReportSummary() async {
    _isLoadingReport = true;
    notifyListeners();

    try {
      _reportSummary = await _reportRepo.getReportSummary(
        startDate: _startDate,
        endDate: _endDate,
      );
    } catch (e) {
      debugPrint('Error loading report summary: $e');
    } finally {
      _isLoadingReport = false;
      notifyListeners();
    }
  }

  void setFilter(String filter, {DateTime? customStart, DateTime? customEnd}) {
    _selectedFilter = filter;
    final now = DateTime.now();

    switch (filter) {
      case 'today':
        _startDate = DateTime(now.year, now.month, now.day);
        _endDate = DateTime(now.year, now.month, now.day, 23, 59, 59);
        break;
      case 'yesterday':
        final yesterday = now.subtract(const Duration(days: 1));
        _startDate = DateTime(yesterday.year, yesterday.month, yesterday.day);
        _endDate = DateTime(yesterday.year, yesterday.month, yesterday.day, 23, 59, 59);
        break;
      case '7days':
        _startDate = DateTime(now.year, now.month, now.day).subtract(const Duration(days: 6));
        _endDate = DateTime(now.year, now.month, now.day, 23, 59, 59);
        break;
      case 'this_month':
        _startDate = DateTime(now.year, now.month, 1);
        _endDate = DateTime(now.year, now.month + 1, 0, 23, 59, 59);
        break;
      case 'custom':
        if (customStart != null && customEnd != null) {
          _startDate = DateTime(customStart.year, customStart.month, customStart.day);
          _endDate = DateTime(customEnd.year, customEnd.month, customEnd.day, 23, 59, 59);
        }
        break;
    }

    loadReportSummary();
  }
}

import logging
from ..models import BatteryStatus, Summary, StatusTitle
from django.db.models import Avg
from datetime import date

logger = logging.getLogger(__name__)


class SummaryUpdater:
    """
    Service to update or create daily summary of battery statuses.
    """

    def update_summary(self):
        today = date.today()
        total_tags = BatteryStatus.objects.count()
        normal_count = BatteryStatus.objects.filter(title=StatusTitle.NORMAL).count()
        low_count = BatteryStatus.objects.filter(title=StatusTitle.LOW).count()
        offline_count = BatteryStatus.objects.filter(title=StatusTitle.OFFLINE).count()
        avg_pct = BatteryStatus.objects.aggregate(avg=Avg("percentage"))["avg"] or 0
        avg_pct_rounded = round(avg_pct)

        exists = self.check_if_summary_exists(
            today, total_tags, normal_count, low_count, offline_count, avg_pct_rounded
        )

        if not exists:
            Summary.objects.create(
                date=today,
                total_tags=total_tags,
                normal_count=normal_count,
                low_count=low_count,
                offline_count=offline_count,
                average_percentage=avg_pct_rounded,
            )
            logger.info("Created new Summary for today.")
        else:
            logger.info("Identical Summary already exists for today.")

    def check_if_summary_exists(
        self, today, total_tags, normal_count, low_count, offline_count, avg_pct_rounded
    ):
        return Summary.objects.filter(
            date=today,
            total_tags=total_tags,
            normal_count=normal_count,
            low_count=low_count,
            offline_count=offline_count,
            average_percentage=avg_pct_rounded,
        ).exists()

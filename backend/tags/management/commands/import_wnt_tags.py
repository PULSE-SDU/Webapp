"""Management command to import tags from WNT_API_mock service."""
from django.core.management.base import BaseCommand
from django.conf import settings
from tags.models import Tag
from tags.services.wnt_api_client import WNTAPIClient
from tags.services.wnt_data_transformer import WNTDataTransformer


class Command(BaseCommand):
    """Command to import tags from WNT_API_mock service."""

    help = "Import tags from WNT_API_mock service"

    def add_arguments(self, parser):
        """Add command line arguments."""
        default_url = getattr(settings, 'WNT_API_BASE_URL', 'http://localhost:8001')
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Preview changes without saving to database",
        )
        parser.add_argument(
            "--api-url",
            type=str,
            default=default_url,
            help=f"Base URL for WNT_API_mock service (default: {default_url})",
        )

    def handle(self, *args, **options):  # pylint: disable=unused-argument
        """
        Execute the command to import tags from WNT_API_mock.
        """
        dry_run = options["dry_run"]
        api_url = options["api_url"]

        self.stdout.write(f"Connecting to WNT_API_mock at {api_url}...")

        # Initialize client and transformer
        client = WNTAPIClient(base_url=api_url)
        transformer = WNTDataTransformer()

        # Fetch data from WNT_API_mock
        self.stdout.write("Fetching latest node data...")
        nodes_data = client.get_all_latest_nodes()

        if nodes_data is None:
            self.stdout.write(
                self.style.ERROR(  # pylint: disable=no-member
                    "Failed to fetch data from WNT_API_mock. "
                    "Please ensure the service is running and accessible."
                )
            )
            return

        self.stdout.write(
            self.style.SUCCESS(  # pylint: disable=no-member
                f"Successfully fetched {len(nodes_data)} nodes from WNT_API_mock"
            )
        )

        # Transform data
        self.stdout.write("Transforming node data to tag format...")
        tags_data = transformer.transform_nodes_to_tags(nodes_data)

        if not tags_data:
            self.stdout.write(
                self.style.WARNING(  # pylint: disable=no-member
                    "No valid tags to import after transformation"
                )
            )
            return

        self.stdout.write(
            f"Successfully transformed {len(tags_data)} tags"
        )

        # Preview or save to database
        if dry_run:
            self.stdout.write(
                self.style.WARNING(  # pylint: disable=no-member
                    "\n=== DRY RUN MODE - No changes will be saved ==="
                )
            )
            self.stdout.write("\nPreview of tags to be imported:")
            for tag_data in tags_data[:5]:  # Show first 5 as preview
                self.stdout.write(f"  - {tag_data['tag_id']}: "
                                f"{tag_data['status']} "
                                f"({tag_data['battery_level']}%, "
                                f"{tag_data['voltage']}V)")
            if len(tags_data) > 5:
                self.stdout.write(f"  ... and {len(tags_data) - 5} more")
        else:
            self.stdout.write("Saving tags to database...")
            created_count = 0
            updated_count = 0

            for tag_data in tags_data:
                _, created = Tag.objects.update_or_create(  # pylint: disable=no-member
                    tag_id=tag_data["tag_id"], defaults=tag_data
                )
                if created:
                    created_count += 1
                else:
                    updated_count += 1

            self.stdout.write(
                self.style.SUCCESS(  # pylint: disable=no-member
                    f"\nSuccessfully imported tags: "
                    f"{created_count} created, {updated_count} updated"
                )
            )

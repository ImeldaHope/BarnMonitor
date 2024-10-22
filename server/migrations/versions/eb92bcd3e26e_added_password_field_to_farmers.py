"""Added password field to farmers

Revision ID: eb92bcd3e26e
Revises: 5641828c51c8
Create Date: 2024-10-21 03:16:05.275191

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eb92bcd3e26e'
down_revision = '5641828c51c8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('health_records', schema=None) as batch_op:
        batch_op.alter_column('checkup_date',
               existing_type=sa.DATETIME(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('health_records', schema=None) as batch_op:
        batch_op.alter_column('checkup_date',
               existing_type=sa.DATETIME(),
               nullable=True)

    # ### end Alembic commands ###

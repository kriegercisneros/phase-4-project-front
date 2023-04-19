"""Create tables

Revision ID: 9e1de5593bd7
Revises: 72d99f7cd094
Create Date: 2023-04-19 12:31:55.462201

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9e1de5593bd7'
down_revision = '72d99f7cd094'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('location')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('location', sa.INTEGER(), autoincrement=False, nullable=True))

    # ### end Alembic commands ###
